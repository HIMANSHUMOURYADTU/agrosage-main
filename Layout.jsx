// src/components/Layout.jsx

import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';
import { FaRobot } from 'react-icons/fa'; // Use a consistent icon

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  in: { opacity: 1, filter: 'blur(0px)' },
  out: { opacity: 0, filter: 'blur(4px)' },
};
const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.6 };

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <div className="page-container">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet /> {/* Renders the current page */}
        </motion.div>
      </div>
      
      {/* --- The "Pulsar" Floating Action Button --- */}
      <Link to="/ecobot" className="fab-chatbot">
        <FaRobot />
      </Link>

      <BottomNav />
    </>
  );
};
export default Layout;