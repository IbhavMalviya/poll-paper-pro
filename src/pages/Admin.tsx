import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Database, TrendingUp, LogOut } from "lucide-react";
import { toast } from "sonner";

interface SurveyResponse {
  id: string;
  created_at: string;
  age: number | null;
  gender: string | null;
  occupation: string | null;
  home_city: string | null;
  home_state: string | null;
  home_schooling: string | null;
  city_tier: string | null;
  current_accommodation: string | null;
  family_income_range: string | null;
  total_devices_owned: number | null;
  devices: any[] | null;
  avg_daily_internet_hours: number | null;
  primary_internet_connection: string | null;
  streaming_academic_hours: string | null;
  streaming_entertainment_hours: string | null;
  cloud_services_usage_hours: string | null;
  primary_charging_habits: string | null;
  primary_power_source: string | null;
  renewable_electricity_access: string | null;
  renewable_energy_usage: string | null;
  has_solar_panels: string | null;
  energy_efficient_appliances: string | null;
  ai_interactions_per_day: string | null;
  type_of_ai_usage: string | null;
  typical_ai_session_length: string | null;
  uploads_per_month_gb: string | null;
  quiz_data_usage_impact: number | null;
  quiz_device_lifespan_impact: number | null;
  quiz_charging_habits_impact: number | null;
  quiz_streaming_gaming_impact: number | null;
  quiz_renewable_energy_impact: number | null;
  quiz_ai_usage_impact: number | null;
  calculated_total_co2: number | null;
  calculated_devices_co2: number | null;
  calculated_streaming_co2: number | null;
  calculated_ai_co2: number | null;
  calculated_charging_co2: number | null;
  estimated_annual_footprint: string | null;
  research_consent: boolean | null;
  raw_data: any | null;
}

const Admin = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    avgAge: 0,
    avgCO2: 0,
    avgDevices: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching responses:', error);
        if (error.code === 'PGRST301') {
          toast.error('Access denied. Admin privileges required.');
          navigate('/auth');
          return;
        }
        toast.error('Failed to load survey responses');
        return;
      }

      if (data) {
        setResponses(data as SurveyResponse[]);
        
        // Calculate statistics
        const total = data.length;
        const avgAge = data.reduce((sum, r) => sum + (r.age || 0), 0) / total;
        const avgCO2 = data.reduce((sum, r) => sum + (r.calculated_total_co2 || 0), 0) / total;
        const avgDevices = data.reduce((sum, r) => sum + (r.total_devices_owned || 0), 0) / total;
        
        setStats({
          total,
          avgAge: Math.round(avgAge),
          avgCO2: Number(avgCO2.toFixed(2)),
          avgDevices: Math.round(avgDevices)
        });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred while loading data');
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const exportToCSV = () => {
    if (responses.length === 0) {
      toast.error('No data to export');
      return;
    }

    // Define comprehensive CSV headers for all survey fields
    const headers = [
      'ID', 'Date', 'Age', 'Gender', 'Occupation', 'City', 'State', 
      'Home Schooling', 'City Tier', 'Current Accommodation', 'Family Income Range',
      'Total Devices', 'Devices (JSON)', 'Daily Internet Hours',
      'Primary Internet Connection', 'Streaming Academic Hours', 'Streaming Entertainment Hours',
      'Cloud Services Usage Hours', 'Primary Charging Habits', 'Primary Power Source',
      'Renewable Electricity Access', 'Renewable Energy Usage', 'Has Solar Panels',
      'Energy Efficient Appliances', 'AI Interactions Per Day', 'Type of AI Usage',
      'Typical AI Session Length', 'Uploads Per Month (GB)',
      'Quiz: Data Usage Impact', 'Quiz: Device Lifespan Impact', 'Quiz: Charging Habits Impact',
      'Quiz: Streaming/Gaming Impact', 'Quiz: Renewable Energy Impact', 'Quiz: AI Usage Impact',
      'Total CO2 (kg/day)', 'Devices CO2', 'Streaming CO2', 'AI CO2', 'Charging CO2',
      'Estimated Annual Footprint', 'Research Consent', 'Raw Data (JSON)'
    ];

    // Convert data to CSV rows with all fields
    const rows = responses.map(r => [
      r.id,
      new Date(r.created_at).toLocaleDateString() + ' ' + new Date(r.created_at).toLocaleTimeString(),
      r.age ?? '',
      r.gender ?? '',
      r.occupation ?? '',
      r.home_city ?? '',
      r.home_state ?? '',
      r.home_schooling ?? '',
      r.city_tier ?? '',
      r.current_accommodation ?? '',
      r.family_income_range ?? '',
      r.total_devices_owned ?? '',
      r.devices ? JSON.stringify(r.devices) : '',
      r.avg_daily_internet_hours ?? '',
      r.primary_internet_connection ?? '',
      r.streaming_academic_hours ?? '',
      r.streaming_entertainment_hours ?? '',
      r.cloud_services_usage_hours ?? '',
      r.primary_charging_habits ?? '',
      r.primary_power_source ?? '',
      r.renewable_electricity_access ?? '',
      r.renewable_energy_usage ?? '',
      r.has_solar_panels ?? '',
      r.energy_efficient_appliances ?? '',
      r.ai_interactions_per_day ?? '',
      r.type_of_ai_usage ?? '',
      r.typical_ai_session_length ?? '',
      r.uploads_per_month_gb ?? '',
      r.quiz_data_usage_impact ?? '',
      r.quiz_device_lifespan_impact ?? '',
      r.quiz_charging_habits_impact ?? '',
      r.quiz_streaming_gaming_impact ?? '',
      r.quiz_renewable_energy_impact ?? '',
      r.quiz_ai_usage_impact ?? '',
      r.calculated_total_co2 ?? '',
      r.calculated_devices_co2 ?? '',
      r.calculated_streaming_co2 ?? '',
      r.calculated_ai_co2 ?? '',
      r.calculated_charging_co2 ?? '',
      r.estimated_annual_footprint ?? '',
      r.research_consent ?? '',
      r.raw_data ? JSON.stringify(r.raw_data) : ''
    ]);

    // Create CSV content with proper escaping
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => {
        const cellStr = String(cell);
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-responses-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const exportToJSON = () => {
    if (responses.length === 0) {
      toast.error('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(responses, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-responses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Database className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-lg text-muted-foreground">Loading survey data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6 px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Database className="w-8 h-8" />
                Survey Data Admin Dashboard
              </h1>
              <p className="text-white/80 mt-2">View and export carbon footprint survey responses</p>
            </div>
            <Button onClick={handleLogout} variant="secondary" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgAge}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg CO₂/day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.avgCO2} kg</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.avgDevices}</div>
            </CardContent>
          </Card>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export to CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export to JSON
          </Button>
          <Button onClick={fetchResponses} variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Survey Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Devices</TableHead>
                    <TableHead>Daily Internet (hrs)</TableHead>
                    <TableHead className="text-right">Total CO₂ (kg/day)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No survey responses yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    responses.map((response) => (
                      <TableRow key={response.id}>
                        <TableCell className="font-medium">
                          {new Date(response.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{response.age || '-'}</TableCell>
                        <TableCell>{response.gender || '-'}</TableCell>
                        <TableCell>{response.occupation || '-'}</TableCell>
                        <TableCell>
                          {response.home_city && response.home_state
                            ? `${response.home_city}, ${response.home_state}`
                            : response.home_city || response.home_state || '-'}
                        </TableCell>
                        <TableCell>{response.total_devices_owned || '-'}</TableCell>
                        <TableCell>{response.avg_daily_internet_hours || '-'}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {response.calculated_total_co2?.toFixed(2) || '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;