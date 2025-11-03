import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData, Device } from "@/types/survey";

interface InternetDevicesSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const deviceTypes = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Desktop",
  "Smart TV",
  "Gaming Console",
  "Streaming Device (Roku, Chromecast, etc.)",
  "Smart Home Devices (Alexa, etc.)",
  "Router/Modem",
  "Other devices",
];

const InternetDevicesSection = ({ surveyData, updateData }: InternetDevicesSectionProps) => {
  const devices = surveyData.devices || deviceTypes.map(type => ({
    type,
    count: 0,
    hoursPerDay: 0,
    ageYears: 0,
  }));

  const updateDevice = (index: number, field: keyof Device, value: number) => {
    const newDevices = [...devices];
    newDevices[index] = { ...newDevices[index], [field]: value };
    updateData("devices", newDevices);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Internet & Devices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryInternetConnection">Primary Internet Connection</Label>
            <Select 
              value={surveyData.primaryInternetConnection} 
              onValueChange={(value) => updateData("primaryInternetConnection", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fiber Broadband">Fiber Broadband</SelectItem>
                <SelectItem value="Mobile Data (4G/5G)">Mobile Data (4G/5G)</SelectItem>
                <SelectItem value="Cable/DSL">Cable/DSL</SelectItem>
                <SelectItem value="Satellite">Satellite</SelectItem>
                <SelectItem value="Mixed usage">Mixed usage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avgDailyInternetHours">Avg daily internet usage (hrs)</Label>
            <Input
              id="avgDailyInternetHours"
              type="number"
              placeholder="e.g. 8"
              value={surveyData.avgDailyInternetHours || ""}
              onChange={(e) => updateData("avgDailyInternetHours", parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalDevicesOwned">Total devices owned</Label>
            <Input
              id="totalDevicesOwned"
              type="number"
              placeholder="e.g. 5"
              value={surveyData.totalDevicesOwned || ""}
              onChange={(e) => updateData("totalDevicesOwned", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-4">Devices Owned (Enter quantity of devices, Daily usage hours, and Age of the devices)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-sm">Device Type</th>
                  <th className="text-center py-2 px-2 font-medium text-sm">Number of devices</th>
                  <th className="text-center py-2 px-2 font-medium text-sm">Hours/Day</th>
                  <th className="text-center py-2 px-2 font-medium text-sm">Age of the devices (Years)</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr key={device.type} className="border-b">
                    <td className="py-2 px-2 text-sm">{device.type}</td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="text-center"
                        value={device.count || ""}
                        onChange={(e) => updateDevice(index, "count", parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="text-center"
                        value={device.hoursPerDay || ""}
                        onChange={(e) => updateDevice(index, "hoursPerDay", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="text-center"
                        value={device.ageYears || ""}
                        onChange={(e) => updateDevice(index, "ageYears", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default InternetDevicesSection;
