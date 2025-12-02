import { useState } from 'react';
import Button from '../../components/UI/Button';
import React from 'react';
const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    privacyPublic: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-section">
        <label>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
          Push Notifications
        </label>
      </div>
      <Button>Save Settings</Button>
    </div>
  );
};

export default Settings;
