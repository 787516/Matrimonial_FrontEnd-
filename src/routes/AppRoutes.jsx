import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from './ProtectedRoute.jsx';
// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register.jsx';
import OTPVerify from '../pages/auth/OTPVerify.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
// import ResetPassword from '../pages/auth/ResetPassword';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Preferences from '../pages/dashboard/Preferences.jsx';
import GalleryUpload from '../pages/dashboard/GalleryUpload.jsx';

//import MyProfile from '../pages/dashboard/MyProfile';
import ProfileAppearance from '../pages/dashboard/MyProfile/ProfileAppearance.jsx';
import ProfileAboutMe from '../pages/dashboard/MyProfile/ProfileAboutMe.jsx';
import ProfileEditPersonal from '../pages/dashboard/MyProfile/ProfileEditPersonal.jsx';
import ProfileHoroscope from '../pages/dashboard/MyProfile/ProfileHoroscope.jsx';
import ProfileReligiousBackground from "../pages/dashboard/MyProfile/ProfileReligiousBackground.jsx"
import ProfileEducationBackground from "../pages/dashboard/MyProfile/ProfileEducationBackground.jsx"
import ProfileLocation from "../pages/dashboard/MyProfile/ProfileLocation.jsx"
import ProfileLifeStyle from "../pages/dashboard/MyProfile/ProfileLifeStyle.jsx"
//import EditProfile from '../pages/dashboard/EditProfile';
//settings page
import AccountSettings from "../pages/dashboard/Settings/AccountSettings.jsx";
import DeactivateProfile from "../pages/dashboard/Settings/DeactivateProfile.jsx"
import DeleteProfile from "../pages/dashboard/Settings/DeleteProfile.jsx";
// Search Pages
import Search from '../pages/search/Search';

//matches pages
import Matches from '../pages/Maches/Matches.jsx';
import ViewProfile from "../pages/Maches/ViewProfile.jsx";
// Chat Pages
import Chat from '../pages/chat/Chat';
import Conversation from '../pages/chat/Conversation';

// Plans Pages
import Plans from '../pages/plans/Plans';
import PaymentSuccess from '../pages/plans/PaymentSuccess';
import PaymentFailed from '../pages/plans/PaymentFailed';

// Settings Pages
import Settings from '../pages/settings Notification/Settings.jsx';
//import Privacy from '../pages/settings Notification/Privacy.js';
import NotificationsPage from "../pages/settings Notification/NotificationsPage.jsx";
// Support Pages
import ContactUs from '../pages/support/ContactUs';

// Home Pages
import Landing from '../pages/home/Landing';
import AboutUs from '../pages/AboutUs/AboutUs.jsx';

const AppRoutes = () => {

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Landing />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutUs />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactUs />
          </PublicLayout>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/otp-verify"
        element={
          <AuthLayout>
            <OTPVerify />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/set-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/partner-preferences"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <preferences />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Matches />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
        <Route
        path="/user/details/:userId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ViewProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      // My Profile Routes
      <Route
        path="/profile/appearance"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileAppearance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/about-me"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileAboutMe />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit-personal"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileEditPersonal />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/Horoscope-details"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileHoroscope />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/religious-background"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileReligiousBackground />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/education-career"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileEducationBackground />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/location"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileLocation />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/lifestyle"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfileLifeStyle />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/partner-preferences"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Preferences />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/GalleryUpload"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <GalleryUpload />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Search Routes */}
      <Route
        path="/search"
        element={
          
            <DashboardLayout>
              <Search />
            </DashboardLayout>
          
        }
      />

       {/* Chat Routes */}
       <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        }
       />
      
       <Route
        path="/chat/:conversationId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Conversation />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Plans Routes */}
      <Route
        path="/membership"
        element={
          
            <DashboardLayout>
              <Plans />
            </DashboardLayout>
          
        }
      />
      <Route
        path="/payment-result"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PaymentSuccess />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/failed"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PaymentFailed />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Settings Routes */}
      <Route
        path="/settings/account"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AccountSettings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> 

       <Route
        path="/settings/deactivate"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DeactivateProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
       <Route
        path="/settings/delete"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DeleteProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <NotificationsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
{/* 
      <Route
        path="/privacy"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Privacy />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* 404 Route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
