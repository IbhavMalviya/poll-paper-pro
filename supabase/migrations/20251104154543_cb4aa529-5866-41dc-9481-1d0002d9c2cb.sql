-- Update RLS policies to restrict survey_responses to admin users only
DROP POLICY IF EXISTS "Anyone can read survey responses for research" ON public.survey_responses;

-- Only admins can read survey responses
CREATE POLICY "Only admins can read survey responses"
ON public.survey_responses
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Keep the insert policy (anyone can submit surveys)
-- The existing "Anyone can submit survey responses" policy remains unchanged