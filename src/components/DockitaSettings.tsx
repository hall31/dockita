
import React from 'react';
import SettingsHeader from './settings/SettingsHeader';
import QuickActions from './settings/QuickActions';
import NotificationSettings from './settings/NotificationSettings';
import PrivacySettings from './settings/PrivacySettings';
import PreferencesSettings from './settings/PreferencesSettings';
import LanguageSettings from './settings/LanguageSettings';
import SupportSettings from './settings/SupportSettings';

const DockitaSettings: React.FC = () => {
  return (
    <div className="px-4 py-2 space-y-6">
      <SettingsHeader />
      <QuickActions />
      <NotificationSettings />
      <PrivacySettings />
      <PreferencesSettings />
      <LanguageSettings />
      <SupportSettings />
    </div>
  );
};

export default DockitaSettings;
