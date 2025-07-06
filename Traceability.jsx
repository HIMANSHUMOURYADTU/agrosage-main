// src/components/Traceability.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { FaQrcode, FaPlusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// --- THE GUARANTEED FIX: "STAR" IMPORT ---
// This imports the entire module as a single object named 'QRCodeReact'
import * as QRCodeReact from 'qrcode.react';
// The actual component we need is inside this object, usually named 'default'
const QRCode = QRCodeReact.default;


const Traceability = () => {
    const navigate = useNavigate();
    const [batchId, setBatchId] = useState('');
    const [qrValue, setQrValue] = useState('');

    const handleGenerate = (e) => {
        e.preventDefault();
        const newId = `AGS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setBatchId(newId);
        setQrValue(`https://agrosage.app/trace/${newId}`);
        toast.success("New Batch ID & QR Code Generated!");
    };

    return (
        <Container fluid="md">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i></button>
                <h1 className="page-title">Crop Traceability</h1>
            </div>
            <p className="page-subtitle">Generate a unique digital identity for your produce.</p>

            <div className="glass-card mb-4">
                <h4 className="fw-bold mb-4 text-light"><FaPlusCircle className="me-2" /> Create New Batch</h4>
                <Form onSubmit={handleGenerate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Crop for this Batch</Form.Label>
                        <Form.Select>
                            <option>Organic Tomatoes (Lot A)</option>
                            <option>Basmati Rice (Field B2)</option>
                            <option>Wheat (Silo 3)</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-grid mt-4">
                        <Button variant="primary" type="submit">Generate Unique Batch ID & QR Code</Button>
                    </div>
                </Form>
            </div>

            <AnimatePresence>
            {qrValue && (
                <motion.div 
                    initial={{opacity:0, scale:0.8}} 
                    animate={{opacity:1, scale:1}} 
                    className="glass-card text-center"
                >
                    <h4 className="fw-bold mb-3 text-light">Your Batch is Ready!</h4>
                    <p className="text-muted">Batch ID: <strong>{batchId}</strong></p>
                    <div className="bg-white p-3 d-inline-block rounded shadow-lg">
                        {/* The QRCode component will now be correctly defined */}
                        {QRCode && <QRCode value={qrValue} size={180} level={"H"} includeMargin={true} />}
                    </div>
                    <p className="mt-3 text-muted">Print this QR code and attach it to your produce batch.</p>
                </motion.div>
            )}
            </AnimatePresence>
        </Container>
    );
};

export default Traceability;