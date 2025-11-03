-- Create survey responses table to store all survey data
CREATE TABLE public.survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Demographics
  age INTEGER,
  gender TEXT,
  occupation TEXT,
  home_schooling TEXT,
  home_city TEXT,
  home_state TEXT,
  city_tier TEXT,
  current_accommodation TEXT,
  family_income_range TEXT,
  
  -- Internet & Devices
  primary_internet_connection TEXT,
  avg_daily_internet_hours NUMERIC,
  total_devices_owned INTEGER,
  
  -- Device Details (stored as JSONB for flexibility)
  devices JSONB DEFAULT '[]'::jsonb,
  
  -- Charging Habits & Power Sources
  primary_charging_habits TEXT,
  primary_power_source TEXT,
  renewable_energy_usage TEXT,
  has_solar_panels TEXT,
  energy_efficient_appliances TEXT,
  
  -- AI, Cloud & Streaming
  ai_interactions_per_day TEXT,
  type_of_ai_usage TEXT,
  typical_ai_session_length TEXT,
  cloud_services_usage_hours TEXT,
  uploads_per_month_gb TEXT,
  streaming_academic_hours TEXT,
  streaming_entertainment_hours TEXT,
  
  -- Quiz Responses
  quiz_data_usage_impact INTEGER CHECK (quiz_data_usage_impact BETWEEN 1 AND 10),
  quiz_device_lifespan_impact INTEGER CHECK (quiz_device_lifespan_impact BETWEEN 1 AND 10),
  quiz_charging_habits_impact INTEGER CHECK (quiz_charging_habits_impact BETWEEN 1 AND 10),
  quiz_streaming_gaming_impact INTEGER CHECK (quiz_streaming_gaming_impact BETWEEN 1 AND 10),
  quiz_renewable_energy_impact INTEGER CHECK (quiz_renewable_energy_impact BETWEEN 1 AND 10),
  quiz_ai_usage_impact INTEGER CHECK (quiz_ai_usage_impact BETWEEN 1 AND 10),
  
  -- Sustainability & Awareness
  renewable_electricity_access TEXT,
  estimated_annual_footprint TEXT,
  
  -- Consent
  research_consent BOOLEAN DEFAULT false,
  
  -- Calculated Results
  calculated_total_co2 NUMERIC,
  calculated_devices_co2 NUMERIC,
  calculated_streaming_co2 NUMERIC,
  calculated_ai_co2 NUMERIC,
  
  -- Raw form data (backup)
  raw_data JSONB
);

-- Enable RLS
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert survey responses (public survey)
CREATE POLICY "Anyone can submit survey responses"
  ON public.survey_responses
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading own responses (if we add user tracking later)
CREATE POLICY "Anyone can read survey responses"
  ON public.survey_responses
  FOR SELECT
  USING (true);

-- Create index for efficient querying
CREATE INDEX idx_survey_responses_created_at ON public.survey_responses(created_at DESC);
CREATE INDEX idx_survey_responses_occupation ON public.survey_responses(occupation);
CREATE INDEX idx_survey_responses_city_tier ON public.survey_responses(city_tier);

-- Create a view for aggregated statistics (useful for research)
CREATE VIEW public.survey_statistics AS
SELECT 
  COUNT(*) as total_responses,
  AVG(age) as avg_age,
  AVG(total_devices_owned) as avg_devices,
  AVG(calculated_total_co2) as avg_carbon_footprint,
  COUNT(DISTINCT occupation) as unique_occupations,
  COUNT(DISTINCT home_state) as states_represented
FROM public.survey_responses;