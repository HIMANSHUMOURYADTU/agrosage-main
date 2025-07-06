import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import AnimatedBackground from './AnimatedBackground';
import { useAppState } from './ThemeContext.jsx';
import Layout from './Layout.jsx';
import Dashboard from './Dashboard.jsx';
import PestScanner from './PestScanner.jsx';
import WasteClassifier from './WasteClassifier.jsx';
import CarbonCalculator from './CarbonCalculator.jsx';
import CarbonResults from './CarbonResults.jsx';
import Missions from './Missions.jsx';
import EcoBot from './EcoBot.jsx';

function App() {
  const location = useLocation();
  const { theme } = useAppState();

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="pest-scanner" element={<PestScanner />} />
            <Route path="waste-classifier" element={<WasteClassifier />} />
            <Route path="carbon-calculator" element={<CarbonCalculator />} />
            <Route path="carbon-results" element={<CarbonResults />} />
            <Route path="missions" element={<Missions />} />
          </Route>
          <Route path="/ecobot" element={<EcoBot />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar theme={theme} />
    </>
  );
}
export default App;
