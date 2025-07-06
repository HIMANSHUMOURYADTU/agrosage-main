// src/components/Logistics.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FaTruck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Logistics = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [isBooking, setIsBooking] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsBooking(true);
        setBooking(null); // Clear previous booking before starting a new one
        setTimeout(() => { // Simulate API call
            toast.success("Booking Confirmed! An agent will contact you shortly.");
            setBooking({
                id: `BK-${Math.floor(Math.random() * 9000 + 1000)}`,
                status: "Booked",
                truck_number: "UP65CT5544",
                ETA: "45 mins",
                driver_contact: "+91-9876543210"
            });
            setIsBooking(false);
        }, 2000);
    };

    return (
        <Container fluid="md">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i></button>
                <h1 className="page-title">Logistics</h1>
            </div>
            <p className="page-subtitle">Get the best value for your produce.</p>

            <div className="glass-card">
                <h4 className="fw-bold mb-4 text-light"><FaTruck className="me-2" /> Book Transport</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3"><Form.Group><Form.Label>Crop Type</Form.Label><Form.Select><option>Wheat (Gehun)</option><option>Paddy (Dhan)</option></Form.Select></Form.Group></Col>
                        <Col md={6} className="mb-3"><Form.Group><Form.Label>Quantity (Quintals)</Form.Label><Form.Control type="number" placeholder="e.g., 50" /></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>Destination</Form.Label><Form.Select><option>Varanasi (Pahadia) Mandi</option><option>Local Cold Storage</option></Form.Select></Form.Group>
                    <div className="d-grid mt-4">
                        <Button variant="success" type="submit" size="lg" disabled={isBooking}>
                            {isBooking ? <Spinner as="span" size="sm" /> : 'Confirm Booking'}
                        </Button>
                    </div>
                </Form>
            </div>

            {/* --- THIS IS THE CRUCIAL FIX --- */}
            {/* Wrap the conditionally rendered result in <AnimatePresence> */}
            <AnimatePresence>
                {booking && (
                    <motion.div 
                        initial={{opacity:0, y:20}} 
                        animate={{opacity:1, y:0}} 
                        exit={{opacity: 0, y:-20}}
                        className="glass-card mt-4"
                    >
                        <h4 className="fw-bold mb-3 text-success">Booking Details (ID: {booking.id})</h4>
                        <p className="mb-1"><strong>Status:</strong> <span className="badge bg-success">{booking.status}</span></p>
                        <p className="mb-1"><strong>Truck Number:</strong> {booking.truck_number}</p>
                        <p className="mb-1"><strong>Est. Arrival:</strong> {booking.ETA}</p>
                        <p><strong>Driver Contact:</strong> <a href={`tel:${booking.driver_contact}`} className="text-light">{booking.driver_contact}</a></p>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    );
};
export default Logistics;