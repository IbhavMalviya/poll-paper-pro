-- Fix security issue by recreating the view with SECURITY INVOKER
DROP VIEW IF EXISTS public.survey_statistics;

CREATE VIEW public.survey_statistics
WITH (security_invoker = true) AS
SELECT 
  COUNT(*) as total_responses,
  AVG(age) as avg_age,
  AVG(total_devices_owned) as avg_devices,
  AVG(calculated_total_co2) as avg_carbon_footprint,
  COUNT(DISTINCT occupation) as unique_occupations,
  COUNT(DISTINCT home_state) as states_represented
FROM public.survey_responses;