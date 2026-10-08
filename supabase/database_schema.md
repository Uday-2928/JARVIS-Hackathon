# CampusPilot Database Schema

This document tracks the Supabase database schema, tables, relationships, and RLS policies for the AI Campus Opportunity Agent.

## Enums
- `user_role`: 'student' | 'admin'
- `application_status`: 'applied' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted'
- `opportunity_type`: 'campus_drive' | 'off_campus' | 'internship' | 'hackathon' | 'workshop' | 'scholarship' | 'certification'

---

## Tables

### 1. `profiles`
Extends the default `auth.users` table to store CampusPilot specific user data.
- **id** (UUID, PK, FK to `auth.users(id)`)
- **role** (user_role, default: 'student')
- **full_name** (TEXT)
- **email** (TEXT, UNIQUE, NOT NULL)
- **avatar_url** (TEXT)
- **university** (TEXT)
- **graduation_year** (INTEGER)
- **degree** (TEXT)
- **major** (TEXT)
- **created_at** / **updated_at** (TIMESTAMPTZ)

**RLS Policies:**
- `SELECT`: Public profiles are viewable by everyone.
- `INSERT`: Users can insert their own profile.
- `UPDATE`: Users can update own profile.

### 2. `student_skills`
Stores parsed resume data, AI extracted skills, and learning goals.
- **id** (UUID, PK)
- **student_id** (UUID, FK to `profiles(id)`, UNIQUE, ON DELETE CASCADE)
- **resume_url** (TEXT)
- **technical_skills** (TEXT[])
- **soft_skills** (TEXT[])
- **interests** (TEXT[])
- **last_parsed_at** (TIMESTAMPTZ)
- **created_at** / **updated_at** (TIMESTAMPTZ)

**RLS Policies:**
- `SELECT`: Students can view their own skills, Admins can view all skills.
- `INSERT`: Students can insert their own skills.
- `UPDATE`: Students can update their own skills.

### 3. `opportunities`
Stores all jobs, internships, hackathons, and placement drives.
- **id** (UUID, PK)
- **title** (TEXT, NOT NULL)
- **company** (TEXT, NOT NULL)
- **type** (opportunity_type, NOT NULL)
- **description** (TEXT)
- **requirements** (TEXT[])
- **location** (TEXT)
- **salary_stipend** (TEXT)
- **deadline** (TIMESTAMPTZ)
- **is_active** (BOOLEAN, default: true)
- **created_by** (UUID, FK to `profiles(id)`)
- **created_at** / **updated_at** (TIMESTAMPTZ)

**RLS Policies:**
- `SELECT`: Opportunities are viewable by everyone.
- `INSERT`: Only admins can insert opportunities.
- `UPDATE`: Only admins can update opportunities.
- `DELETE`: Only admins can delete opportunities.

### 4. `applications`
Tracks student applications to specific opportunities.
- **id** (UUID, PK)
- **opportunity_id** (UUID, FK to `opportunities(id)`, ON DELETE CASCADE)
- **student_id** (UUID, FK to `profiles(id)`, ON DELETE CASCADE)
- **status** (application_status, default: 'applied')
- **ai_match_score** (INTEGER 0-100)
- **applied_at** / **updated_at** (TIMESTAMPTZ)
- **UNIQUE(opportunity_id, student_id)**

**RLS Policies:**
- `SELECT`: Students can view their own applications, Admins can view all applications.
- `INSERT`: Students can apply to opportunities.
- `UPDATE`: Students can update their own applications, Admins can update all applications.

---

## Authentication & Next Steps
- Supabase MCP is configured using the `@modelcontextprotocol/server-postgres` fallback to ensure database read/write without IDE token caching issues.
- Connection is managed securely via `.env.local` which holds the project URL, anon key, and database connection strings.
