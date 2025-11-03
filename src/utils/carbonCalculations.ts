import { SurveyData } from "@/types/survey";

export const calculateCarbonFootprint = (data: Partial<SurveyData>) => {
  let devicesCo2 = 0;
  let streamingCo2 = 0;
  let aiCo2 = 0;

  // Device emissions calculation
  if (data.devices && data.devices.length > 0) {
    data.devices.forEach(device => {
      // Manufacturing emissions (kg CO2 per device per year, amortized over device lifetime)
      const manufacturingEmissions: Record<string, number> = {
        "Smartphone": 50,
        "Laptop": 300,
        "Tablet": 100,
        "Desktop": 500,
        "Smart TV": 400,
        "Gaming Console": 200,
        "Streaming Device (Roku, Chromecast, etc.)": 30,
        "Smart Home Devices (Alexa, etc.)": 40,
        "Router/Modem": 60,
        "Other devices": 50,
      };

      const deviceEmission = manufacturingEmissions[device.type] || 50;
      const lifetime = device.ageYears || 3;
      const annualManufacturing = (deviceEmission / lifetime) * device.count;

      // Usage emissions (electricity consumption)
      // Average power consumption in watts
      const powerConsumption: Record<string, number> = {
        "Smartphone": 5,
        "Laptop": 50,
        "Tablet": 10,
        "Desktop": 200,
        "Smart TV": 100,
        "Gaming Console": 150,
        "Streaming Device (Roku, Chromecast, etc.)": 5,
        "Smart Home Devices (Alexa, etc.)": 3,
        "Router/Modem": 10,
        "Other devices": 20,
      };

      const watts = powerConsumption[device.type] || 20;
      const kwh = (watts * device.hoursPerDay * 365) / 1000; // Annual kWh
      const co2PerKwh = 0.82; // kg CO2 per kWh (India grid average)
      const annualUsage = kwh * co2PerKwh * device.count;

      devicesCo2 += annualManufacturing + annualUsage;
    });
  }

  // Streaming emissions
  const streamingHoursMap: Record<string, number> = {
    "None": 0,
    "Less than 5 hours": 2.5,
    "5-10 hours": 7.5,
    "10-20 hours": 15,
    "20-40 hours": 30,
    "More than 40 hours": 50,
  };

  const academicHours = streamingHoursMap[data.streamingAcademicHours || "None"] || 0;
  const entertainmentHours = streamingHoursMap[data.streamingEntertainmentHours || "None"] || 0;
  const totalStreamingHours = (academicHours + entertainmentHours) * 52; // Weekly to annual
  
  // 0.055 kg CO2 per hour of HD streaming
  streamingCo2 += totalStreamingHours * 0.055;

  // Cloud usage
  const cloudHoursMap: Record<string, number> = {
    "None": 0,
    "Less than 5": 2.5,
    "5-10": 7.5,
    "10-20": 15,
    "20-40": 30,
    "More than 40": 50,
  };
  
  const cloudHours = cloudHoursMap[data.cloudServicesUsageHours || "None"] || 0;
  streamingCo2 += cloudHours * 52 * 0.02; // kg CO2 per hour

  // AI emissions
  const aiInteractionsMap: Record<string, number> = {
    "None": 0,
    "1-5": 3,
    "5-10": 7.5,
    "10-20": 15,
    "20-50": 35,
    "More than 50": 75,
  };

  const aiInteractions = aiInteractionsMap[data.aiInteractionsPerDay || "None"] || 0;
  
  // AI session length multiplier
  const sessionLengthMap: Record<string, number> = {
    "Less than 5 minutes": 0.5,
    "5-15 minutes": 1,
    "15-30 minutes": 1.5,
    "30-60 minutes": 2,
    "More than 1 hour": 3,
  };
  
  const sessionMultiplier = sessionLengthMap[data.typicalAiSessionLength || "5-15 minutes"] || 1;
  
  // 0.002 kg CO2 per AI interaction (text), more for images
  const typeMultiplier = data.typeOfAiUsage?.includes("Image") ? 5 : 1;
  aiCo2 += aiInteractions * 365 * 0.002 * sessionMultiplier * typeMultiplier;

  const total = devicesCo2 + streamingCo2 + aiCo2;

  return {
    total,
    devices: devicesCo2,
    streaming: streamingCo2,
    ai: aiCo2,
  };
};
