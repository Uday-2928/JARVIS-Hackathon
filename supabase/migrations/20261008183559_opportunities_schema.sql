-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Update Enums (Adding new types)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'opportunity_type' AND e.enumlabel = 'competition') THEN
        ALTER TYPE opportunity_type ADD VALUE 'competition';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'opportunity_type' AND e.enumlabel = 'conference') THEN
        ALTER TYPE opportunity_type ADD VALUE 'conference';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'opportunity_type' AND e.enumlabel = 'training') THEN
        ALTER TYPE opportunity_type ADD VALUE 'training';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'opportunity_type' AND e.enumlabel = 'other') THEN
        ALTER TYPE opportunity_type ADD VALUE 'other';
    END IF;
END
$$;

DO $$ BEGIN
    CREATE TYPE event_mode AS ENUM ('online', 'in_person', 'hybrid', 'unknown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_difficulty AS ENUM ('beginner', 'intermediate', 'advanced', 'unknown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Expand profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience_level TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_mode event_mode;

-- User Skills & Preferences
CREATE TABLE IF NOT EXISTS public.user_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest TEXT NOT NULL,
    UNIQUE(user_id, interest)
);

CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    preferred_locations TEXT[],
    preferred_event_types opportunity_type[],
    preferred_domains TEXT[],
    remote_preference BOOLEAN DEFAULT false,
    min_match_score INTEGER DEFAULT 50
);

-- Opportunities Core (ALTER existing table)
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'internal';
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS source_id TEXT DEFAULT gen_random_uuid()::text;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS canonical_id UUID;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS application_url TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS mode event_mode DEFAULT 'unknown'::event_mode;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS start_date TIMESTAMPTZ;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS end_date TIMESTAMPTZ;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMPTZ;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS eligibility_text TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS team_size_min INTEGER;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS team_size_max INTEGER;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS difficulty event_difficulty DEFAULT 'unknown'::event_difficulty;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS prize_summary TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS raw_data JSONB;

-- Rename 'company' to 'organizer' if 'organizer' doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='opportunities' and column_name='organizer') THEN
      ALTER TABLE public.opportunities RENAME COLUMN company TO organizer;
  END IF;
END $$;

-- Rename 'type' to 'event_type' if 'event_type' doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='opportunities' and column_name='event_type') THEN
      ALTER TABLE public.opportunities RENAME COLUMN type TO event_type;
  END IF;
END $$;

-- Drop constraints if they exist, then add them
ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS fk_canonical;
ALTER TABLE public.opportunities ADD CONSTRAINT fk_canonical FOREIGN KEY (canonical_id) REFERENCES public.opportunities(id) ON DELETE SET NULL;

ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_source_source_id_key;
ALTER TABLE public.opportunities ADD CONSTRAINT opportunities_source_source_id_key UNIQUE(source, source_id);

-- Opportunity Metadata
CREATE TABLE IF NOT EXISTS public.opportunity_skills (
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    skill TEXT NOT NULL,
    PRIMARY KEY(opportunity_id, skill)
);

CREATE TABLE IF NOT EXISTS public.opportunity_technologies (
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    technology TEXT NOT NULL,
    PRIMARY KEY(opportunity_id, technology)
);

CREATE TABLE IF NOT EXISTS public.opportunity_domains (
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    domain TEXT NOT NULL,
    PRIMARY KEY(opportunity_id, domain)
);

CREATE TABLE IF NOT EXISTS public.opportunity_embeddings (
    opportunity_id UUID PRIMARY KEY REFERENCES public.opportunities(id) ON DELETE CASCADE,
    embedding vector(1536) -- 1536 is size of text-embedding-3-small
);

-- Index for pgvector
CREATE INDEX IF NOT EXISTS opportunity_embeddings_idx ON public.opportunity_embeddings USING hnsw (embedding vector_cosine_ops);

-- User Tracking
CREATE TABLE IF NOT EXISTS public.bookmarks (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(user_id, opportunity_id)
);

CREATE TABLE IF NOT EXISTS public.recommendations (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    semantic_score INTEGER,
    skill_score INTEGER,
    interest_score INTEGER,
    location_score INTEGER,
    eligibility_score INTEGER,
    deadline_score INTEGER,
    preference_score INTEGER,
    reasons TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(user_id, opportunity_id)
);

-- RLS Policies
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Allow public read for opportunities metadata
CREATE POLICY "Public read opportunity_skills" ON public.opportunity_skills FOR SELECT USING (true);
CREATE POLICY "Public read opportunity_technologies" ON public.opportunity_technologies FOR SELECT USING (true);
CREATE POLICY "Public read opportunity_domains" ON public.opportunity_domains FOR SELECT USING (true);

-- Allow authenticated users to manage their own data
CREATE POLICY "Users manage own interests" ON public.user_interests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own recommendations" ON public.recommendations FOR SELECT USING (auth.uid() = user_id);
