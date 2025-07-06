import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { FaMapMarkedAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { motion, AnimatePresence } from 'framer-motion';

// FAKE DATA (Simulating an API Response)
const fakeMandiData = [
    { id: 'm1', name: 'Varanasi (Pahadia)', crop: 'Wheat', price: 2350, distance: 12, updated: 'Today, 9:15 AM' },
    { id: 'm2', name: 'Chandauli Mandi', crop: 'Paddy', price: 2200, distance: 25, updated: 'Today, 10:02 AM' },
    { id: 'm3', name: 'Varanasi (Pahadia)', crop: 'Mustard', price: 5400, distance: 12, updated: 'Yesterday' },
    { id: 'm4', name: 'Ghazipur Anaj Mandi', crop: 'Wheat', price: 2375, distance: 45, updated: 'Today, 8:40 AM' },
    { id: 'm5', name: 'Mirzapur Mandi', crop: 'Paddy', price: 2180, distance: 60, updated: 'Today, 11:05 AM' },
];

const MandiFinder = () => {
    const [mandis, setMandis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCrop, setSelectedCrop] = useState('All');

    useEffect(() => {
        setTimeout(() => {
            setMandis(fakeMandiData);
            setLoading(false);
        }, 1500);
    }, []);

    const filteredMandis = mandis.filter(mandi => 
        selectedCrop === 'All' || mandi.crop === selectedCrop
    ).sort((a, b) => a.distance - b.distance);

    const uniqueCrops = ['All', ...new Set(mandis.map(m => m.crop))];

    return (
        <Container fluid="md">
            <h1 className="page-title">Nearby Mandi Rates</h1>
            <p className="page-subtitle">Live prices from agricultural markets near you. Based on your location in Varanasi, UP.</p>

            <div className="glass-card mb-4">
                <Form.Group>
                    <Form.Label className="fw-bold text-light">Filter by Crop</Form.Label>
                    <Form.Select onChange={(e) => setSelectedCrop(e.target.value)} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                        {uniqueCrops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                    </Form.Select>
                </Form.Group>
            </div>
            
            {loading ? <Skeleton count={4} height={90} borderRadius="var(--border-radius)" className="mb-3" /> : (
                <AnimatePresence>
                    {filteredMandis.map((mandi, index) => (
                        <motion.div
                            key={mandi.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card mb-3"
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-1">{mandi.name}</h5>
                                    <p className="mb-1 text-muted"><FaMapMarkedAlt className="me-2"/>{mandi.distance} km away</p>
                                    <p className="mb-0 small text-muted">Updated: {mandi.updated}</p>
                                </div>
                                <div className="text-end">
                                    <p className="mb-1 fw-bold fs-5" style={{ color: 'var(--glow-green)'}}>₹ {mandi.price} / Qtl</p>
                                    <p className="mb-0 text-muted">{mandi.crop}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </Container>
    );
};
export default MandiFinder;