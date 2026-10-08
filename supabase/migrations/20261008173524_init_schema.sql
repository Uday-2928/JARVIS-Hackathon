-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE application_status AS ENUM ('applied', 'reviewing', 'shortlisted', 'rejected', 'accepted');
CREATE TYPE opportunity_type AS ENUM ('campus_drive', 'off_campus', 'internship', 'hackathon', 'workshop', 'scholarship', 'certification');

-- Users extension table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role DEFAULT 'student'::user_role,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    university TEXT,
    graduation_year INTEGER,
    degree TEXT,
    major TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Skills & Resume data
CREATE TABLE public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    resume_url TEXT,
    technical_skills TEXT[],
    soft_skills TEXT[],
    interests TEXT[],
    last_parsed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Opportunities
CREATE TABLE public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    type opportunity_type NOT NULL,
    description TEXT,
    requirements TEXT[],
    location TEXT,
    salary_stipend TEXT,
    deadline TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status application_status DEFAULT 'applied'::application_status,
    ai_match_score INTEGER CHECK (ai_match_score >= 0 AND ai_match_score <= 100),
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(opportunity_id, student_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for student_skills
CREATE POLICY "Students can view their own skills" ON public.student_skills FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Admins can view all skills" ON public.student_skills FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Students can insert their own skills" ON public.student_skills FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update their own skills" ON public.student_skills FOR UPDATE USING (auth.uid() = student_id);

-- Policies for opportunities
CREATE POLICY "Opportunities are viewable by everyone" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Only admins can insert opportunities" ON public.opportunities FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Only admins can update opportunities" ON public.opportunities FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Only admins can delete opportunities" ON public.opportunities FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for applications
CREATE POLICY "Students can view their own applications" ON public.applications FOR SELECT USING (
    auth.uid() = student_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Students can apply to opportunities" ON public.applications FOR INSERT WITH CHECK (
    auth.uid() = student_id
);
CREATE POLICY "Students can update their own applications" ON public.applications FOR UPDATE USING (
    auth.uid() = student_id
);
CREATE POLICY "Admins can update all applications" ON public.applications FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
