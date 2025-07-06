import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDashboardData } from './api.js';

const AppStateContext = createContext();

// This is the hook we will import in other components
export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [sustainabilityScore, setSustainabilityScore] = useState(35);

    useEffect(() => {
        const fetchData = () => {
            getDashboardData().then(res => {
                // Safety check for data
                if (res && res.data) {
                    setSustainabilityScore(res.data.sustainability_score);
                }
            }).catch(err => console.error("Could not fetch data for context"));
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 19 || currentHour < 6) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const value = { theme, sustainabilityScore };

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
};
