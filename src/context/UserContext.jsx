import { createContext, useState, useCallback } from 'react';
import React from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUserProfile = useCallback((profile) => {
    setUserProfile(profile);
  }, []);

  const updatePreferences = useCallback((prefs) => {
    setPreferences(prefs);
  }, []);

  const value = {
    userProfile,
    preferences,
    loading,
    updateUserProfile,
    updatePreferences,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
