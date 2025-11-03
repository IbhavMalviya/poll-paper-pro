import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import DemographicsSection from "./sections/DemographicsSection";
import InternetDevicesSection from "./sections/InternetDevicesSection";
import ChargingHabitsSection from "./sections/ChargingHabitsSection";
import AICloudStreamingSection from "./sections/AICloudStreamingSection";
import CarbonQuizSection from "./sections/CarbonQuizSection";
import SustainabilitySection from "./sections/SustainabilitySection";
import SubmitSection from "./sections/SubmitSection";
import { SurveyData } from "@/types/survey";
import { calculateCarbonFootprint } from "@/utils/carbonCalculations";

interface SurveyFormProps {
  surveyData: Partial<SurveyData>;
  setSurveyData: (data: Partial<SurveyData>) => void;
  setCarbonFootprint: (footprint: { total: number; devices: number; streaming: number; ai: number; charging: number }) => void;
}

const SurveyForm = ({ surveyData, setSurveyData, setCarbonFootprint }: SurveyFormProps) => {
  // Recalculate carbon footprint whenever survey data changes
  useEffect(() => {
    const footprint = calculateCarbonFootprint(surveyData);
    setCarbonFootprint(footprint);
    
    // Store calculated values in survey data
    setSurveyData({
      ...surveyData,
      calculatedTotalCo2: footprint.total,
      calculatedDevicesCo2: footprint.devices,
      calculatedStreamingCo2: footprint.streaming,
      calculatedAiCo2: footprint.ai,
      calculatedChargingCo2: footprint.charging,
    });
  }, [surveyData.devices, surveyData.primaryChargingHabits, surveyData.primaryPowerSource, surveyData.streamingAcademicHours, surveyData.streamingEntertainmentHours, surveyData.cloudServicesUsageHours, surveyData.aiInteractionsPerDay, surveyData.typicalAiSessionLength, surveyData.typeOfAiUsage, setCarbonFootprint]);

  const updateData = (field: string, value: any) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <DemographicsSection surveyData={surveyData} updateData={updateData} />
      </Card>

      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <InternetDevicesSection surveyData={surveyData} updateData={updateData} />
      </Card>

      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <ChargingHabitsSection surveyData={surveyData} updateData={updateData} />
      </Card>

      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <AICloudStreamingSection surveyData={surveyData} updateData={updateData} />
      </Card>

      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <CarbonQuizSection surveyData={surveyData} updateData={updateData} />
      </Card>

      <Card style={{ boxShadow: 'var(--shadow-card)' }}>
        <SustainabilitySection surveyData={surveyData} updateData={updateData} />
      </Card>

      <SubmitSection surveyData={surveyData} updateData={updateData} />
    </div>
  );
};

export default SurveyForm;
