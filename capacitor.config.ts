
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.25e6c7fa93a34a7492910d2eafae7eae',
  appName: 'TeleMed Afrique',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://25e6c7fa-93a3-4a74-9291-0d2eafae7eae.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
