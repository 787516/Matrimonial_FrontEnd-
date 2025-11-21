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
import Register from '../pages/auth/OTPVerify';
import OTPVerify from '../pages/auth/OTPVerify';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
 
// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Matches from '../pages/dashboard/Matches';
import ViewProfile from '../pages/dashboard/ViewProfile';
import EditProfile from '../pages/dashboard/EditProfile';
import Preferences from '../pages/dashboard/Preferences';
import GalleryUpload from '../pages/dashboard/GalleryUpload';

// Search Pages
import Search from '../pages/search/Search';

// Chat Pages
import Chat from '../pages/chat/Chat';
import Conversation from '../pages/chat/Conversation';

// Plans Pages
import Plans from '../pages/plans/Plans';
import PaymentSuccess from '../pages/plans/PaymentSuccess';
import PaymentFailed from '../pages/plans/PaymentFailed';

// Settings Pages
import Settings from '../pages/settings/Settings';
import Privacy from '../pages/settings/Privacy';

// Support Pages
import ContactUs from '../pages/support/ContactUs';

// Home Pages
import Landing from '../pages/home/Landing';
import AboutUs from '../pages/home/AboutUs';

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
        path="/forgot-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthLayout>
            <ResetPassword />
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
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ViewProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EditProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/preferences"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Preferences />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/gallery"
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
          <ProtectedRoute>
            <DashboardLayout>
              <Search />
            </DashboardLayout>
          </ProtectedRoute>
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
        path="/plans"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Plans />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/success"
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
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/privacy"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Privacy />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
