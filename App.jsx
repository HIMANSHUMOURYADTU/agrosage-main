// src/App.jsx

import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

// --- Import all necessary providers and components ---
import { useAppState } from './ThemeContext.jsx';
import AnimatedBackground from './AnimatedBackground.jsx';
import Layout from './Layout.jsx';
import Dashboard from './Dashboard.jsx';
import PestScanner from './PestScanner.jsx';
import WasteClassifier from './WasteClassifier.jsx';
import CarbonCalculator from './CarbonCalculator.jsx';
import CarbonResults from './CarbonResults.jsx';
import Missions from './Missions.jsx';
import EcoBot from './Ecobot.jsx';

// --- IMPORT THE THREE MISSING POWER FEATURE COMPONENTS ---
import MandiFinder from './MandiFinder.jsx';
import Logistics from './Logistics.jsx';
import Traceability from './Traceability.jsx';

// Page transition animation variants
const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.01 },
};
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

function App() {
  const location = useLocation();
  const { theme } = useAppState();

  return (
    <>
      <AnimatedBackground />

      <AnimatePresence mode="popLayout">
        {/* We apply animation to a wrapper around the Routes for smooth transitions */}
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location} key={location.pathname}>
            {/* The Layout route handles all pages that share the BottomNav */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="pest-scanner" element={<PestScanner />} />
              <Route path="waste-classifier" element={<WasteClassifier />} />
              <Route path="missions" element={<Missions />} />

              {/* --- ADDED ROUTES FOR ALL YOUR POWER FEATURES --- */}
              <Route path="mandi-finder" element={<MandiFinder />} />
              <Route path="logistics" element={<Logistics />} />
              <Route path="traceability" element={<Traceability />} />
              
              {/* --- ADDED ROUTES FOR THE FULL CARBON CALCULATOR FLOW --- */}
              <Route path="carbon-calculator" element={<CarbonCalculator />} />
              <Route path="carbon-results" element={<CarbonResults />} />
            </Route>

            {/* Standalone route for the full-screen chatbot experience */}
            <Route path="/ecobot" element={<EcoBot />} />
            
            {/* A catch-all route to prevent 404 errors, redirecting to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        theme={theme}
      />
    </>
  );
}

export default App;
