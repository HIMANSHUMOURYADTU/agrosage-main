import React, { useState, useRef } from 'react';
import { Container, Alert, ListGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { classifyWaste } from './api.js';
import { FaTrashAlt, FaRecycle } from 'react-icons/fa';

const WasteClassifier = () => {
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError('');
            handleScan(selectedFile);
        }
    };

    const handleScan = async (fileToScan) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileToScan);
        try {
            const response = await classifyWaste(formData);
            setResult(response.data);
        } catch (err) {
            setError('Classification failed. Please try another image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid="md">
            <h1 className="page-title">AI Waste Classifier</h1>
            <p className="page-subtitle">Dispose of farm waste responsibly.</p>
            <div className="image-upload-area" onClick={() => fileInputRef.current.click()}>
                {preview ? <img src={preview} alt="Preview" className="image-preview" /> :
                    <div className="text-center text-muted">
                        <FaTrashAlt size={60} className="mb-3" />
                        <h5 className="fw-bold">Tap to Upload</h5>
                        <p className="mb-0">Select an image of a waste item</p>
                    </div>
                }
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />

            <AnimatePresence>
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="glass-card mt-4"><Skeleton count={4} height={30} /></div>
                    </motion.div>
                )}
            </AnimatePresence>
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
            
            <AnimatePresence>
                {result && (
                    <motion.div className="glass-card mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h4 className="fw-bold text-light mb-3"><FaRecycle className="me-2" />Classification Result</h4>
                        {/* This ListGroup now correctly inherits the readable styles */}
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Detected:</strong> {result.caption}</ListGroup.Item>
                            <ListGroup.Item><strong>Category:</strong> {result.category.toUpperCase()}</ListGroup.Item>
                            <ListGroup.Item><strong>Recommended Bin:</strong> {result.bin_color.toUpperCase()}</ListGroup.Item>
                            <ListGroup.Item><strong>Reason:</strong> {result.explanation}</ListGroup.Item>
                        </ListGroup>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    );
};
export default WasteClassifier;
