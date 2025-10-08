-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor', 'contributor', 'viewer');

-- Create enum for publish states
CREATE TYPE public.publish_state AS ENUM ('draft', 'scheduled', 'published', 'archived');

-- Create enum for employment types
CREATE TYPE public.employment_type AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('new', 'reviewed', 'contacted', 'rejected', 'hired');

-- Create profiles table (links to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  icon_name TEXT,
  featured_image TEXT,
  pricing_range_min DECIMAL(10,2),
  pricing_range_max DECIMAL(10,2),
  estimated_timeline TEXT,
  scope_template TEXT,
  publish_state public.publish_state DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  description TEXT,
  featured_image TEXT,
  gallery JSONB DEFAULT '[]',
  client_name TEXT,
  location TEXT,
  category TEXT,
  tags TEXT[],
  project_size TEXT,
  budget_range TEXT,
  start_date DATE,
  completion_date DATE,
  project_status TEXT,
  process_notes TEXT,
  publish_state public.publish_state DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_services junction table
CREATE TABLE public.project_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  UNIQUE(project_id, service_id)
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES public.profiles(id),
  category TEXT,
  tags TEXT[],
  read_time_minutes INTEGER,
  publish_state public.publish_state DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_publish TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  canonical_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_postings table
CREATE TABLE public.job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type public.employment_type,
  responsibilities TEXT,
  qualifications TEXT,
  salary_range TEXT,
  closing_date DATE,
  publish_state public.publish_state DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resume_submissions table
CREATE TABLE public.resume_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.job_postings(id) ON DELETE SET NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_message TEXT,
  resume_url TEXT,
  portfolio_links TEXT[],
  status public.application_status DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  submission_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table (for custom static pages)
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_blocks JSONB DEFAULT '[]',
  publish_state public.publish_state DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_log table
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  object_type TEXT NOT NULL,
  object_id UUID,
  before_state JSONB,
  after_state JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create security definer function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'admin')
  )
$$;

-- Create security definer function to check if user can edit content
CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'admin', 'editor', 'contributor')
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "User roles viewable by admins" 
ON public.user_roles FOR SELECT 
TO authenticated 
USING (public.is_admin(auth.uid()));

CREATE POLICY "User roles manageable by super admins" 
ON public.user_roles FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for services (public read, admin write)
CREATE POLICY "Published services viewable by everyone" 
ON public.services FOR SELECT 
USING (publish_state = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Services manageable by content editors" 
ON public.services FOR ALL 
TO authenticated 
USING (public.can_edit_content(auth.uid()));

-- RLS Policies for projects (public read, admin write)
CREATE POLICY "Published projects viewable by everyone" 
ON public.projects FOR SELECT 
USING (publish_state = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Projects manageable by content editors" 
ON public.projects FOR ALL 
TO authenticated 
USING (public.can_edit_content(auth.uid()));

-- RLS Policies for project_services
CREATE POLICY "Project services viewable by everyone" 
ON public.project_services FOR SELECT 
USING (true);

CREATE POLICY "Project services manageable by content editors" 
ON public.project_services FOR ALL 
TO authenticated 
USING (public.can_edit_content(auth.uid()));

-- RLS Policies for blog_posts
CREATE POLICY "Published blog posts viewable by everyone" 
ON public.blog_posts FOR SELECT 
USING (publish_state = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Blog posts manageable by content editors" 
ON public.blog_posts FOR ALL 
TO authenticated 
USING (public.can_edit_content(auth.uid()));

-- RLS Policies for job_postings
CREATE POLICY "Published job postings viewable by everyone" 
ON public.job_postings FOR SELECT 
USING (publish_state = 'published');

CREATE POLICY "Job postings manageable by admins" 
ON public.job_postings FOR ALL 
TO authenticated 
USING (public.is_admin(auth.uid()));

-- RLS Policies for resume_submissions
CREATE POLICY "Resume submissions viewable by admins" 
ON public.resume_submissions FOR SELECT 
TO authenticated 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit resumes" 
ON public.resume_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Resume submissions manageable by admins" 
ON public.resume_submissions FOR UPDATE 
TO authenticated 
USING (public.is_admin(auth.uid()));

-- RLS Policies for contact_submissions
CREATE POLICY "Contact submissions viewable by admins" 
ON public.contact_submissions FOR SELECT 
TO authenticated 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Contact submissions manageable by admins" 
ON public.contact_submissions FOR UPDATE 
TO authenticated 
USING (public.is_admin(auth.uid()));

-- RLS Policies for pages
CREATE POLICY "Published pages viewable by everyone" 
ON public.pages FOR SELECT 
USING (publish_state = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Pages manageable by content editors" 
ON public.pages FOR ALL 
TO authenticated 
USING (public.can_edit_content(auth.uid()));

-- RLS Policies for audit_log
CREATE POLICY "Audit log viewable by admins" 
ON public.audit_log FOR SELECT 
TO authenticated 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Audit log insertable by authenticated users" 
ON public.audit_log FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON public.job_postings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resume_submissions_updated_at BEFORE UPDATE ON public.resume_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();