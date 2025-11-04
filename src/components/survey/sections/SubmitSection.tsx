import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SurveyData } from "@/types/survey";
import { calculateCarbonFootprint } from "@/utils/carbonCalculations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Lock, UserX, Server, Download, Globe } from "lucide-react";
import { z } from "zod";

// Comprehensive validation schema for survey data
const surveySchema = z.object({
  // Demographics
  age: z.number().int().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  gender: z.string().trim().min(1, "Gender is required").max(50, "Gender must be less than 50 characters"),
  occupation: z.string().trim().min(1, "Occupation is required").max(100, "Occupation must be less than 100 characters"),
  homeSchooling: z.string().trim().max(100).optional(),
  homeCity: z.string().trim().max(100).optional(),
  homeState: z.string().trim().max(100).optional(),
  cityTier: z.string().trim().max(50).optional(),
  currentAccommodation: z.string().trim().max(100).optional(),
  familyIncomeRange: z.string().trim().max(100).optional(),
  
  // Internet & Devices
  primaryInternetConnection: z.string().trim().min(1, "Internet connection type is required").max(100),
  avgDailyInternetHours: z.number().min(0, "Hours cannot be negative").max(24, "Hours cannot exceed 24"),
  totalDevicesOwned: z.number().int().min(0, "Device count cannot be negative").max(100, "Device count seems unrealistic"),
  devices: z.array(z.object({
    type: z.string().max(50),
    count: z.number().int().min(0).max(100),
    hoursPerDay: z.number().min(0).max(24),
    ageYears: z.number().int().min(0).max(50)
  })).optional(),
  
  // Charging & Power
  primaryChargingHabits: z.string().trim().min(1, "Charging habits are required").max(100),
  primaryPowerSource: z.string().trim().max(100).optional(),
  renewableEnergyUsage: z.string().trim().max(100).optional(),
  hasSolarPanels: z.string().trim().max(50).optional(),
  energyEfficientAppliances: z.string().trim().max(50).optional(),
  
  // AI, Cloud & Streaming
  aiInteractionsPerDay: z.string().trim().min(1, "AI interactions are required").max(100),
  typeOfAiUsage: z.string().trim().max(200).optional(),
  typicalAiSessionLength: z.string().trim().max(100).optional(),
  cloudServicesUsageHours: z.string().trim().min(1, "Cloud usage is required").max(100),
  uploadsPerMonthGb: z.string().trim().max(100).optional(),
  streamingAcademicHours: z.string().trim().min(1, "Academic streaming hours are required").max(100),
  streamingEntertainmentHours: z.string().trim().min(1, "Entertainment streaming hours are required").max(100),
  
  // Quiz responses
  quizDataUsageImpact: z.number().int().min(0).max(10).optional(),
  quizDeviceLifespanImpact: z.number().int().min(0).max(10).optional(),
  quizChargingHabitsImpact: z.number().int().min(0).max(10).optional(),
  quizStreamingGamingImpact: z.number().int().min(0).max(10).optional(),
  quizRenewableEnergyImpact: z.number().int().min(0).max(10).optional(),
  quizAiUsageImpact: z.number().int().min(0).max(10).optional(),
  
  // Sustainability
  renewableElectricityAccess: z.string().trim().max(100).optional(),
  estimatedAnnualFootprint: z.string().trim().max(100).optional(),
  
  // Consent
  researchConsent: z.boolean().refine(val => val === true, "Consent is required"),
});

interface SubmitSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const SubmitSection = ({ surveyData, updateData }: SubmitSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId] = useState(() => {
    // Get or create a unique session ID
    let id = localStorage.getItem('survey_session_id');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('survey_session_id', id);
    }
    return id;
  });

  // Check if user has already submitted in this session
  useEffect(() => {
    const submissions = localStorage.getItem('survey_submissions');
    if (submissions) {
      const submissionData = JSON.parse(submissions);
      const sessionSubmissions = submissionData[sessionId];
      if (sessionSubmissions && sessionSubmissions.count >= 1) {
        const lastSubmission = new Date(sessionSubmissions.lastSubmission);
        const hoursSinceSubmission = (Date.now() - lastSubmission.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceSubmission < 1) {
          toast.info("You've already submitted a survey recently. Please wait before submitting again.");
        }
      }
    }
  }, [sessionId]);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(surveyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carbon-footprint-survey-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Survey data downloaded as JSON");
  };

  const handleSubmit = async () => {
    // Check rate limiting
    const submissions = localStorage.getItem('survey_submissions');
    if (submissions) {
      const submissionData = JSON.parse(submissions);
      const sessionSubmissions = submissionData[sessionId];
      if (sessionSubmissions && sessionSubmissions.count >= 1) {
        const lastSubmission = new Date(sessionSubmissions.lastSubmission);
        const hoursSinceSubmission = (Date.now() - lastSubmission.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceSubmission < 1) {
          toast.error("You've already submitted a survey recently. Please wait at least 1 hour between submissions.");
          return;
        }
      }
    }

    // Validate data with zod schema
    const validationResult = surveySchema.safeParse(surveyData);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      const errorMessages = errors.map(err => `${err.path.join('.')}: ${err.message}`).join('; ');
      toast.error(`Validation failed: ${errorMessages}`);
      console.error('Validation errors:', errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const footprint = calculateCarbonFootprint(surveyData);

      const { error } = await supabase.from("survey_responses").insert([{
        age: surveyData.age,
        gender: surveyData.gender,
        occupation: surveyData.occupation,
        home_schooling: surveyData.homeSchooling,
        home_city: surveyData.homeCity,
        home_state: surveyData.homeState,
        city_tier: surveyData.cityTier,
        current_accommodation: surveyData.currentAccommodation,
        family_income_range: surveyData.familyIncomeRange,
        primary_internet_connection: surveyData.primaryInternetConnection,
        avg_daily_internet_hours: surveyData.avgDailyInternetHours,
        total_devices_owned: surveyData.totalDevicesOwned,
        devices: (surveyData.devices || []) as any,
        primary_charging_habits: surveyData.primaryChargingHabits,
        primary_power_source: surveyData.primaryPowerSource,
        renewable_energy_usage: surveyData.renewableEnergyUsage,
        has_solar_panels: surveyData.hasSolarPanels,
        energy_efficient_appliances: surveyData.energyEfficientAppliances,
        ai_interactions_per_day: surveyData.aiInteractionsPerDay,
        type_of_ai_usage: surveyData.typeOfAiUsage,
        typical_ai_session_length: surveyData.typicalAiSessionLength,
        cloud_services_usage_hours: surveyData.cloudServicesUsageHours,
        uploads_per_month_gb: surveyData.uploadsPerMonthGb,
        streaming_academic_hours: surveyData.streamingAcademicHours,
        streaming_entertainment_hours: surveyData.streamingEntertainmentHours,
        quiz_data_usage_impact: surveyData.quizDataUsageImpact,
        quiz_device_lifespan_impact: surveyData.quizDeviceLifespanImpact,
        quiz_charging_habits_impact: surveyData.quizChargingHabitsImpact,
        quiz_streaming_gaming_impact: surveyData.quizStreamingGamingImpact,
        quiz_renewable_energy_impact: surveyData.quizRenewableEnergyImpact,
        quiz_ai_usage_impact: surveyData.quizAiUsageImpact,
        renewable_electricity_access: surveyData.renewableElectricityAccess,
        estimated_annual_footprint: surveyData.estimatedAnnualFootprint,
        research_consent: surveyData.researchConsent,
        calculated_total_co2: footprint.total,
        calculated_devices_co2: footprint.devices,
        calculated_streaming_co2: footprint.streaming,
        calculated_ai_co2: footprint.ai,
        calculated_charging_co2: footprint.charging,
        raw_data: surveyData as any,
      }]);

      if (error) throw error;

      // Track successful submission
      const submissions = JSON.parse(localStorage.getItem('survey_submissions') || '{}');
      submissions[sessionId] = {
        count: (submissions[sessionId]?.count || 0) + 1,
        lastSubmission: new Date().toISOString()
      };
      localStorage.setItem('survey_submissions', JSON.stringify(submissions));

      toast.success("Survey submitted successfully! Thank you for your contribution.");
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardContent className="pt-6">
        <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy-info" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                📋 Data Privacy & Research Information (Click to expand)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground pt-2">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Your Privacy Matters:</strong> All data collected is completely anonymized and encrypted. We use industry-standard security protocols to protect your information.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Research Purpose:</strong> This data is used exclusively for academic research on digital sustainability and carbon footprint awareness. It helps researchers understand technology usage patterns and promote eco-friendly digital habits.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <UserX className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">No Personal Identity:</strong> We do not collect names, email addresses, IP addresses, or any personally identifiable information. Your responses are completely anonymous.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Server className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Secure Storage:</strong> Your data is stored on secure, encrypted servers with restricted access. Only authorized researchers can access the anonymized dataset for analysis.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Download className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Voluntary Participation:</strong> Your participation is completely voluntary. You can download a copy of your responses before submitting using the "Download JSON" button.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Making an Impact:</strong> Your contribution helps promote sustainable technology practices and raises awareness about digital carbon footprints. Thank you for participating in this important research!
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="consent"
            checked={surveyData.researchConsent || false}
            onCheckedChange={(checked) => updateData("researchConsent", checked)}
          />
          <Label htmlFor="consent" className="cursor-pointer">
            I have read the privacy information above and consent to participating in this research.
          </Label>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          <Button
            variant="outline"
            onClick={downloadJSON}
          >
            Download JSON
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !surveyData.researchConsent}
            style={{ 
              background: 'var(--gradient-success)',
              color: 'white',
              fontWeight: '600'
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmitSection;
