import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData } from "@/types/survey";

interface DemographicsSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const DemographicsSection = ({ surveyData, updateData }: DemographicsSectionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age <span className="text-destructive">*</span></Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g. 21"
            required
            min="1"
            max="120"
            value={surveyData.age || ""}
            onChange={(e) => updateData("age", parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender <span className="text-destructive">*</span></Label>
          <Select value={surveyData.gender} onValueChange={(value) => updateData("gender", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation <span className="text-destructive">*</span></Label>
          <Select value={surveyData.occupation} onValueChange={(value) => updateData("occupation", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
              <SelectItem value="Homemaker">Homemaker</SelectItem>
              <SelectItem value="Retired">Retired</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeSchooling">Home Schooling</Label>
          <Select value={surveyData.homeSchooling} onValueChange={(value) => updateData("homeSchooling", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Partially">Partially</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeCity">Home City</Label>
          <Input
            id="homeCity"
            placeholder="Enter your city"
            value={surveyData.homeCity || ""}
            onChange={(e) => updateData("homeCity", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeState">Home State</Label>
          <Select value={surveyData.homeState} onValueChange={(value) => updateData("homeState", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your home state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
              <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
              <SelectItem value="Assam">Assam</SelectItem>
              <SelectItem value="Bihar">Bihar</SelectItem>
              <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
              <SelectItem value="Goa">Goa</SelectItem>
              <SelectItem value="Gujarat">Gujarat</SelectItem>
              <SelectItem value="Haryana">Haryana</SelectItem>
              <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
              <SelectItem value="Jharkhand">Jharkhand</SelectItem>
              <SelectItem value="Karnataka">Karnataka</SelectItem>
              <SelectItem value="Kerala">Kerala</SelectItem>
              <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
              <SelectItem value="Manipur">Manipur</SelectItem>
              <SelectItem value="Meghalaya">Meghalaya</SelectItem>
              <SelectItem value="Mizoram">Mizoram</SelectItem>
              <SelectItem value="Nagaland">Nagaland</SelectItem>
              <SelectItem value="Odisha">Odisha</SelectItem>
              <SelectItem value="Punjab">Punjab</SelectItem>
              <SelectItem value="Rajasthan">Rajasthan</SelectItem>
              <SelectItem value="Sikkim">Sikkim</SelectItem>
              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
              <SelectItem value="Telangana">Telangana</SelectItem>
              <SelectItem value="Tripura">Tripura</SelectItem>
              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
              <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
              <SelectItem value="West Bengal">West Bengal</SelectItem>
              <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>
              <SelectItem value="Chandigarh">Chandigarh</SelectItem>
              <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>
              <SelectItem value="Ladakh">Ladakh</SelectItem>
              <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
              <SelectItem value="Puducherry">Puducherry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cityTier">City Tier</Label>
          <Select value={surveyData.cityTier} onValueChange={(value) => updateData("cityTier", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tier 1">Tier 1</SelectItem>
              <SelectItem value="Tier 2">Tier 2</SelectItem>
              <SelectItem value="Tier 3">Tier 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentAccommodation">Current Accommodation</Label>
          <Select value={surveyData.currentAccommodation} onValueChange={(value) => updateData("currentAccommodation", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Owned House">Owned House</SelectItem>
              <SelectItem value="Rented Apartment">Rented Apartment</SelectItem>
              <SelectItem value="Hostel">Hostel</SelectItem>
              <SelectItem value="PG">PG</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="familyIncomeRange">Family Income Range</Label>
          <Select value={surveyData.familyIncomeRange} onValueChange={(value) => updateData("familyIncomeRange", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Below 3 LPA">Below 3 LPA</SelectItem>
              <SelectItem value="3-6 LPA">3-6 LPA</SelectItem>
              <SelectItem value="6-10 LPA">6-10 LPA</SelectItem>
              <SelectItem value="10-15 LPA">10-15 LPA</SelectItem>
              <SelectItem value="Above 15 LPA">Above 15 LPA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </>
  );
};

export default DemographicsSection;
