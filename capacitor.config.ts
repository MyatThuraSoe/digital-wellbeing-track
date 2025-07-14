import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.22768b9912dd491eb05c99d1a929a3e1',
  appName: 'digital-wellbeing-track',
  webDir: 'dist',
  server: {
    url: "https://22768b99-12dd-491e-b05c-99d1a929a3e1.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#007AFF",
      showSpinner: false
    }
  }
};

export default config;