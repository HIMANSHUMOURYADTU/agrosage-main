// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { getDashboardData } from '../api/api';
import CountUp from 'react-countup';

// --- CORRECTED ICON IMPORTS ---
import { FaShieldAlt, FaLeaf, FaFlag, FaExclamationTriangle, FaBiohazard, FaInfoCircle, FaVial } from 'react-icons/fa';
import { FaTemperatureHalf } from 'react-icons/fa6'; // Correctly imported from fa6
import { GiWaterDrop } from 'react-icons/gi';
import { FiCpu } from 'react-icons/fi';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [livePlotData, setLivePlotData] = useState({ moisture: 65, temperature: 28.0, ph: 6.8 });

    useEffect(() => {
        const timer = setTimeout(() => {
            getDashboardData().then(res => setData(res.data)).catch(() => setError('Failed to connect to AgroSage servers.')).finally(() => setLoading(false));
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLivePlotData({
                moisture: Math.floor(Math.random() * 20 + 55),
                temperature: parseFloat((Math.random() * 5 + 27).toFixed(1)),
                ph: parseFloat((Math.random() * 0.7 + 6.5).toFixed(1)),
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getAlertStyle = (level) => ({
        'critical': { variant: 'danger', icon: <FaBiohazard /> },
        'warning': { variant: 'warning', icon: <FaExclamationTriangle /> },
        'info': { variant: 'info', icon: <FaInfoCircle /> }
    }[level] || { variant: 'info', icon: <FaInfoCircle /> });
    
    const { alerts = [], sustainability_score = 0, carbon_credits = 0, active_missions = 0, recommendations = [] } = data || {};

    const renderLoading = () => (
        <>
            <div className="mb-4"><Skeleton height={60} borderRadius="var(--border-radius)" /></div>
            <h2 className="page-title fs-4"><Skeleton width={250} /></h2>
            <Row className="mb-4">
                <Col xs={4}><div className="glass-card text-center"><Skeleton height={90} /></div></Col>
                <Col xs={4}><div className="glass-card text-center"><Skeleton height={90} /></div></Col>
                <Col xs={4}><div className="glass-card text-center"><Skeleton height={90} /></div></Col>
            </Row>
            <div className="mb-4"><Skeleton height={120} borderRadius="var(--border-radius)" /></div>
        </>
    );

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container fluid="md">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Your farm's real-time AI overview.</p>
            {loading ? renderLoading() : (
                <>
                    <AnimatePresence>
                        {alerts.map((alert, i) => (
                            <motion.div key={alert.id} initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*.2}} className="mb-4">
                                <Alert variant={getAlertStyle(alert.level).variant} className="d-flex align-items-center shadow-sm" style={{borderRadius: 'var(--border-radius)'}}>
                                    <div className="fs-3 me-3">{getAlertStyle(alert.level).icon}</div>
                                    <div><Alert.Heading as="h6" className="mb-1">{alert.title}</Alert.Heading><small>{alert.details}</small></div>
                                </Alert>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <h2 className="page-title fs-4">Live Plot Monitor</h2>
                    <Row className="mb-4">
                        <Col xs={4} className="mb-3">
                            <div className="glass-card text-center h-100">
                                <GiWaterDrop size={28} className="mb-2" style={{ color: '#0d6efd' }} />
                                <h6 className="text-muted small">Moisture</h6>
                                <p className="fs-3 fw-bold mb-0"><CountUp end={livePlotData.moisture} duration={1.5} suffix="%" /></p>
                            </div>
                        </Col>
                        <Col xs={4} className="mb-3">
                            <div className="glass-card text-center h-100">
                                <FaTemperatureHalf size={28} className="mb-2" style={{ color: '#dc3545' }} />
                                <h6 className="text-muted small">Temperature</h6>
                                <p className="fs-3 fw-bold mb-0"><CountUp end={livePlotData.temperature} duration={1.5} decimals={1} suffix="°C" /></p>
                            </div>
                        </Col>
                        <Col xs={4} className="mb-3">
                            <div className="glass-card text-center h-100">
                                <FaVial size={28} className="mb-2" style={{ color: '#6f42c1' }} />
                                <h6 className="text-muted small">Soil pH</h6>
                                <p className="fs-3 fw-bold mb-0"><CountUp end={livePlotData.ph} duration={1.5} decimals={1} /></p>
                            </div>
                        </Col>
                    </Row>
                    <div className="mb-4" style={{ borderRadius: 'var(--border-radius)', padding: '2rem', background: 'linear-gradient(135deg, var(--accent-green), var(--primary-green))', color: 'white', boxShadow: '0 10px 30px -10px rgba(46, 125, 80, 0.5)' }}>
                        <Row className="align-items-center">
                            <Col><h6 className="fw-light" style={{ opacity: 0.8 }}>Sustainability Score</h6><p className="display-3 fw-bold mb-0"><CountUp end={sustainability_score} duration={2} /></p></Col>
                            <Col xs="auto"><FaShieldAlt className="fa-5x" style={{ opacity: 0.2 }} /></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xs={6} className="mb-4"><div className="glass-card text-center h-100"><FaLeaf size={28} className="mb-2" style={{ color: 'var(--glow-green)' }} /><h6 className="text-muted">Carbon Credits</h6><p className="fs-2 fw-bold mb-0"><CountUp end={carbon_credits} duration={2} /></p></div></Col>
                        <Col xs={6} className="mb-4"><div className="glass-card text-center h-100"><FaFlag size={28} className="mb-2 text-warning" /><h6 className="text-muted">Active Missions</h6><p className="fs-2 fw-bold mb-0"><CountUp end={active_missions} duration={2} /></p></div></Col>
                    </Row>
                    <h2 className="page-title fs-5 mt-3">AI Recommendations</h2>
                    {recommendations.map(rec => (
                        <div key={rec.id} className="glass-card d-flex align-items-center mb-3">
                           <FiCpu className="text-info me-3 fs-3 flex-shrink-0" />
                           <div>
                            <div className="fw-bold">{rec.title}</div>
                            <small className="text-muted">{rec.details}</small>
                           </div>
                        </div>
                    ))}
                </>
            )}
        </Container>
    );
};

export default Dashboard;