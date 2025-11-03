export interface Device {
  type: string;
  count: number;
  hoursPerDay: number;
  ageYears: number;
}

export interface SurveyData {
  // Demographics
  age: number;
  gender: string;
  occupation: string;
  homeSchooling: string;
  homeCity: string;
  homeState: string;
  cityTier: string;
  currentAccommodation: string;
  familyIncomeRange: string;

  // Internet & Devices
  primaryInternetConnection: string;
  avgDailyInternetHours: number;
  totalDevicesOwned: number;
  devices: Device[];

  // Charging Habits & Power Sources
  primaryChargingHabits: string;
  primaryPowerSource: string;
  renewableEnergyUsage: string;
  hasSolarPanels: string;
  energyEfficientAppliances: string;

  // AI, Cloud & Streaming
  aiInteractionsPerDay: string;
  typeOfAiUsage: string;
  typicalAiSessionLength: string;
  cloudServicesUsageHours: string;
  uploadsPerMonthGb: string;
  streamingAcademicHours: string;
  streamingEntertainmentHours: string;

  // Quiz Responses
  quizDataUsageImpact: number;
  quizDeviceLifespanImpact: number;
  quizChargingHabitsImpact: number;
  quizStreamingGamingImpact: number;
  quizRenewableEnergyImpact: number;
  quizAiUsageImpact: number;

  // Sustainability & Awareness
  renewableElectricityAccess: string;
  estimatedAnnualFootprint: string;

  // Consent
  researchConsent: boolean;

  // Calculated Results
  calculatedTotalCo2: number;
  calculatedDevicesCo2: number;
  calculatedStreamingCo2: number;
  calculatedAiCo2: number;
}
