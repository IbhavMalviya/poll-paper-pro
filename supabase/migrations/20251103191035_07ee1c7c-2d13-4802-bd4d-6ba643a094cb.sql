-- Add calculated_charging_co2 column to survey_responses table
ALTER TABLE public.survey_responses 
ADD COLUMN IF NOT EXISTS calculated_charging_co2 numeric;