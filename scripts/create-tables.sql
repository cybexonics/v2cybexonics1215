-- Create form_submissions table for contact forms
CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  form_type VARCHAR(50) NOT NULL DEFAULT 'contact',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);

-- Create career_submissions table for career applications
CREATE TABLE IF NOT EXISTS career_submissions (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  position VARCHAR(255) NOT NULL,
  linkedin VARCHAR(500),
  portfolio VARCHAR(500),
  github VARCHAR(500),
  resume VARCHAR(500),
  hearAbout VARCHAR(255) NOT NULL,
  message TEXT,
  form_type VARCHAR(50) NOT NULL DEFAULT 'career',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_processed ON form_submissions(processed);
CREATE INDEX IF NOT EXISTS idx_career_submissions_created_at ON career_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_career_submissions_processed ON career_submissions(processed);

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON form_submissions
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users" ON career_submissions
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create policies for service role (for email functions)
CREATE POLICY "Allow all for service role" ON form_submissions
  FOR ALL TO service_role USING (true);

CREATE POLICY "Allow all for service role" ON career_submissions
  FOR ALL TO service_role USING (true);
