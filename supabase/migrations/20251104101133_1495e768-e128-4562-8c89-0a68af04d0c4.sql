-- Drop the existing view
DROP VIEW IF EXISTS public.survey_statistics;

-- Create a security definer function that only admins can access
CREATE OR REPLACE FUNCTION public.get_survey_statistics()
RETURNS TABLE (
  total_responses BIGINT,
  avg_age NUMERIC,
  avg_devices NUMERIC,
  avg_carbon_footprint NUMERIC,
  unique_occupations BIGINT,
  states_represented BIGINT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*)::BIGINT as total_responses,
    AVG(age) as avg_age,
    AVG(total_devices_owned) as avg_devices,
    AVG(calculated_total_co2) as avg_carbon_footprint,
    COUNT(DISTINCT occupation)::BIGINT as unique_occupations,
    COUNT(DISTINCT home_state)::BIGINT as states_represented
  FROM public.survey_responses
  WHERE public.has_role(auth.uid(), 'admin');
$$;

-- Grant execute permission only to authenticated users
GRANT EXECUTE ON FUNCTION public.get_survey_statistics() TO authenticated;