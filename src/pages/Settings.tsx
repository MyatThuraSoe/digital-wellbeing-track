import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Moon, 
  Sun, 
  Download, 
  Shield, 
  Bell, 
  Database, 
  Trash2, 
  Info,
  Settings as SettingsIcon,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  const handleExportData = () => {
    // In a real app, this would export data as CSV/PDF
    console.log('Exporting data...');
  };

  const handleClearData = () => {
    // In a real app, this would clear local storage
    console.log('Clearing data...');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pt-12">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-white/80">Customize your FocusTrack experience</p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* App Settings */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
            App Settings
          </h3>
          
          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <Separator />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Goal Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you reach your daily goals
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <Separator />

            {/* Data Tracking */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Usage Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic usage data collection
                  </p>
                </div>
              </div>
              <Switch
                checked={dataCollection}
                onCheckedChange={setDataCollection}
              />
            </div>
          </div>
        </Card>

        {/* Privacy & Data */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Privacy & Data
          </h3>
          
          <div className="space-y-4">
            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent">Privacy First</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    All your data is stored locally on your device. FocusTrack never sends 
                    your personal usage data to external servers or cloud services.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data (CSV/PDF)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Database className="h-4 w-4 mr-2" />
                View Data Storage Info
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleClearData}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Stats */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Data Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">2.1 MB</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">15</div>
              <div className="text-sm text-muted-foreground">Apps Monitored</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">456h</div>
              <div className="text-sm text-muted-foreground">Total Tracked</div>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-primary" />
            About FocusTrack
          </h3>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Version 1.0.0</p>
              <p>
                FocusTrack helps you build healthier digital habits by providing 
                insights into your phone usage patterns while keeping your data 
                completely private.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Privacy Policy
              </Button>
              <Button variant="outline" size="sm">
                Terms of Service
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </Card>

        {/* Permissions Info */}
        <Card className="p-4 shadow-soft bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            📱 To track usage accurately, FocusTrack requires device usage access permissions. 
            This data never leaves your device.
          </p>
        </Card>
      </div>
    </div>
  );
}