import React, { useMemo } from 'react';
import { useAppState } from '/ThemeContext';

const AnimatedBackground = () => {
    // Get the live sustainability score from our global context
    const { sustainabilityScore } = useAppState();

    // useMemo will recalculate the style only when the score changes
    const videoStyle = useMemo(() => {
        let saturation = 100;
        let brightness = 100;

        // Map the score (0-100) to a filter value
        if (sustainabilityScore > 75) {
            saturation = 125; // Super vibrant
            brightness = 105;
        } else if (sustainabilityScore > 40) {
            saturation = 100; // Normal color
            brightness = 100;
        } else {
            saturation = 40; // Desaturated
            brightness = 90; // Slightly dim
        }

        return {
            // The filter property is what creates the dynamic effect
            filter: `saturate(${saturation}%) brightness(${brightness}%)`,
            transition: 'filter 2s ease-in-out', // Smoothly animate between states
            position: 'fixed',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: -2,
            transform: 'translateX(-50%) translateY(-50%)',
        };
    }, [sustainabilityScore]);

    return (
        <div className="video-background-container">
            <video
                autoPlay
                loop
                muted
                playsInline
                style={videoStyle}
                key={sustainabilityScore} // Force re-render on score change for some browsers
            >
                <source src="/farm-drone-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;
