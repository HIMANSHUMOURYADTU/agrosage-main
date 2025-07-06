import React, { useState, useRef } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { scanPest } from '../api/api';
import { FaCamera, FaNotesMedical } from 'react-icons/fa';

const PestScanner = () => {
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
        setLoading(true); setError('');
        const formData = new FormData();
        formData.append('file', fileToScan);

        try {
            const response = await scanPest(formData);
            const raw = response.data.result;
            // Robustly parse the response, handling potential missing parts
            const diagMatch = raw.match(/Diagnosis: (.*)/);
            const solMatch = raw.match(/Solution: (.*)/);
            setResult({
                diagnosis: diagMatch ? diagMatch[1] : "Could not determine diagnosis.",
                solution: solMatch ? solMatch[1] : "No specific solution provided."
            });
        } catch (err) {
            setError('Analysis failed. The AI model might be busy or the image is unclear.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Container fluid="md">
            <h1 className="page-title">AI Pest Scanner</h1>
            <p className="page-subtitle">Get an instant diagnosis for your crops.</p>
            
            <div className="image-upload-area" onClick={() => fileInputRef.current.click()}>
                {preview ? (
                    <motion.img 
                        src={preview} 
                        alt="Preview" 
                        className="image-preview"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    />
                ) : (
                    <div className="text-center text-muted">
                        <FaCamera size={60} className="mb-3" />
                        <h5 className="fw-bold">Tap to Upload</h5>
                        <p className="mb-0">Select an image of a plant leaf</p>
                    </div>
                )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />

            <AnimatePresence>
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="glass-card mt-4">
                            <h5 className="fw-bold d-flex align-items-center"><i className="fas fa-brain me-2 text-success"></i>Analyzing Image...</h5>
                            <Skeleton count={4} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

            <AnimatePresence>
                {result && (
                    <motion.div
                        className="glass-card mt-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                    >
                        <h4 className="fw-bold text-success mb-3"><FaNotesMedical className="me-2" />AI Analysis Result</h4>
                        <div className="mb-3">
                            <p className="mb-1 text-muted small text-uppercase fw-bold">Diagnosis</p>
                            <p className="fs-5">{result.diagnosis}</p>
                        </div>
                        <hr style={{borderColor: 'var(--light-green)'}}/>
                        <div className="mt-3">
                            <p className="mb-1 text-muted small text-uppercase fw-bold">Recommended Solution</p>
                            <p className="fs-5 mb-0">{result.solution}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    );
};
export default PestScanner;