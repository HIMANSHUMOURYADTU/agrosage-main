import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// --- Import all necessary icons for the complete navigation ---
import { 
    FaThLarge, 
    FaBug, 
    FaRecycle, 
    FaMapMarkedAlt, 
    FaTruck, 
    FaQrcode, 
    FaCalculator, 
    FaFlagCheckered, 
    FaEllipsisH 
} from 'react-icons/fa';

// Primary items visible in the main nav bar
const primaryNavItems = [
    { to: "/", icon: <FaThLarge />, label: "Dashboard" },
    { to: "/pest-scanner", icon: <FaBug />, label: "Pest Scan" },
    { to: "/waste-classifier", icon: <FaRecycle />, label: "Waste Scan" },
];

// Secondary items that appear in the "More" menu
const moreNavItems = [
    { to: "/mandi-finder", icon: <FaMapMarkedAlt />, label: "Mandi Rates" },
    { to: "/logistics", icon: <FaTruck />, label: "Logistics" },
    { to: "/traceability", icon: <FaQrcode />, label: "Crop Traceability" },
    { to: "/carbon-calculator", icon: <FaCalculator />, label: "Carbon Calculator" },
    { to: "/missions", icon: <FaFlagCheckered />, label: "Missions" },
];

const BottomNav = () => {
    const [showMore, setShowMore] = useState(false);
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setShowMore(false);
    }, [location.pathname]);

    useEffect(() => {
        const navContainer = navRef.current;
        const indicator = indicatorRef.current;
        if (!navContainer || !indicator) return;

        // This robust method finds the parent of the active link to measure
        const activeItemContainer = navContainer.querySelector('a.active')?.parentElement;

        if (activeItemContainer) {
            const itemRect = activeItemContainer.getBoundingClientRect();
            const navRect = navContainer.getBoundingClientRect();
            
            indicator.style.left = `${itemRect.left - navRect.left}px`;
            indicator.style.width = `${itemRect.width}px`;
            indicator.style.opacity = '1';
        } else {
            indicator.style.opacity = '0';
        }
    }, [location.pathname]);

    return (
        <>
            <div className="bottom-nav-container">
                <div className="bottom-nav" ref={navRef}>
                    <div id="nav-indicator" ref={indicatorRef}></div>
                    
                    {primaryNavItems.map((item) => (
                        <div className="nav-item" key={item.to}>
                            <NavLink to={item.to} className="nav-link" end={item.to === "/"}>
                                <i>{item.icon}</i>
                                <span>{item.label}</span>
                            </NavLink>
                        </div>
                    ))}
                    
                    <div className="nav-item">
                        <button className="nav-link more-button" onClick={() => setShowMore(true)}>
                            <i><FaEllipsisH /></i>
                            <span>More</span>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showMore && (
                    <>
                        <motion.div className="more-menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMore(false)} />
                        <motion.div className="more-menu-sheet" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                            <ListGroup variant="flush">
                                {moreNavItems.map(item => (
                                    <ListGroup.Item as={Link} to={item.to} action key={item.to}>
                                        <i>{item.icon}</i> {item.label}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;