import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import questConfig from '../questConfig';

// Pages
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

// Original Components
import Header from './components/Header';
import Hero from './components/Hero';
import CourseOverview from './components/CourseOverview';
import LearningObjectives from './components/LearningObjectives';
import CourseModules from './components/CourseModules';
import TargetAudience from './components/TargetAudience';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <OnboardingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Original Landing Page */}
              <Route 
                path="/" 
                element={
                  <>
                    <Header />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Hero />
                      <CourseOverview />
                      <LearningObjectives />
                      <CourseModules />
                      <TargetAudience />
                      <Pricing />
                    </motion.div>
                    <Footer />
                  </>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;