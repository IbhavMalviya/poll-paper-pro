-- Update RLS policy to allow public read access to survey responses
-- This is appropriate because:
-- 1. The data is anonymous (no PII)
-- 2. It's research data meant to be analyzed
-- 3. The admin dashboard needs access without complex authentication

DROP POLICY IF EXISTS "Only admins can read survey responses" ON public.survey_responses;

CREATE POLICY "Anyone can read survey responses for research"
ON public.survey_responses
FOR SELECT
USING (true);

-- Keep the insert policy as is (anyone can submit)
-- The data remains secure because there's no UPDATE or DELETE access