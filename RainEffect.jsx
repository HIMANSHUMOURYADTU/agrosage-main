import React from 'react';
import { motion } from 'framer-motion';

const RainEffect = () => {
    const raindrops = Array.from({ length: 150 }).map((_, index) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
            animationDelay: `${Math.random() * 5}s`,
        };
        return <motion.div key={index} className="raindrop" style={style}></motion.div>;
    });

    return <div className="rain-container">{raindrops}</div>;
};

export default RainEffect;