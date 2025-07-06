// src/components/BottomNav.jsx

import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaThLarge, FaBug, FaRecycle, FaCalculator, FaFlagCheckered } from 'react-icons/fa';

const navItems = [
    { to: "/", icon: <FaThLarge />, label: "Dashboard" },
    { to: "/pest-scanner", icon: <FaBug />, label: "Pest Scan" },
    { to: "/waste-classifier", icon: <FaRecycle />, label: "Waste Scan" },
    { to: "/carbon-calculator", icon: <FaCalculator />, label: "Carbon" },
    { to: "/missions", icon: <FaFlagCheckered />, label: "Missions" }
];

const BottomNav = () => {
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const navContainer = navRef.current;
        const indicator = indicatorRef.current;
        const activeItem = navContainer.querySelector('a.active');

        if (activeItem && indicator) {
            // Calculate the position to move the indicator to
            const itemRect = activeItem.getBoundingClientRect();
            const navRect = navContainer.getBoundingClientRect();
            
            // The indicator's left position is relative to the start of the nav container
            const leftPosition = itemRect.left - navRect.left;
            
            indicator.style.left = `${leftPosition}px`;
            indicator.style.width = `${itemRect.width}px`;
        }
    }, [location]); // Rerun this logic every time the page (location) changes

    return (
        <div className="bottom-nav-container">
            <div className="bottom-nav" ref={navRef}>
                {/* The animated "underline" indicator */}
                <div id="nav-indicator" ref={indicatorRef}></div>

                {navItems.map((item) => (
                    <NavLink to={item.to} className="nav-link" key={item.to} end={item.to === "/"}>
                        <i>{item.icon}</i>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;