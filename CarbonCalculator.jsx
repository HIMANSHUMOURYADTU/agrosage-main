import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { calculateCarbon } from '../api/api';
import { FaTractor } from 'react-icons/fa';
import { GiPlantSeed } from 'react-icons/gi';

const CarbonCalculator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        irrigation_type: 'Electric Pump', tractor_hours: 100, irrigation_hours: 200,
        cover_crop: 'Yes', renewable_energy: 'Yes', area: 10, fertilizer_kg: 50
    });

    const handleInputChange = (key, value) => {
        const numericFields = ['area', 'fertilizer_kg', 'tractor_hours', 'irrigation_hours'];
        const finalValue = numericFields.includes(key) ? Number(value) : value;
        setInputs(prev => ({ ...prev, [key]: finalValue }));
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        if (inputs.area <= 0) { setError('Farm area must be greater than zero.'); return; }
        setLoading(true); setError('');
        try {
            const response = await calculateCarbon(inputs);
            toast.success('Calculation successful!');
            navigate('/carbon-results', { state: { result: response.data } });
        } catch (err) {
            setError('Failed to calculate. The API might be down or an input is invalid.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid="md">
            <h1 className="page-title">Farm Carbon Calculator</h1>
            <p className="page-subtitle">Understand and reduce your environmental impact.</p>
            <Form onSubmit={handleCalculate}>
                <div className="glass-card mb-4">
                    <h5 className="fw-bold mb-4"><FaTractor className="text-success me-2" />Machinery & Irrigation</h5>
                    <Form.Group className="mb-3"><Form.Label>Farm Area (hectares)</Form.Label><Form.Control type="number" value={inputs.area} onChange={(e) => handleInputChange('area', e.target.value)} required min="0.1" step="0.1"/></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Irrigation Source</Form.Label><Form.Select value={inputs.irrigation_type} onChange={(e) => handleInputChange('irrigation_type', e.target.value)}><option>Electric Pump</option><option>Diesel Pump</option><option>Canal</option></Form.Select></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Irrigation hours per year: {inputs.irrigation_hours}</Form.Label><Form.Range value={inputs.irrigation_hours} onChange={(e) => handleInputChange('irrigation_hours', e.target.value)} min={0} max={2000} step={50}/></Form.Group>
                    <Form.Group><Form.Label>Tractor usage per year (hours): {inputs.tractor_hours}</Form.Label><Form.Range value={inputs.tractor_hours} onChange={(e) => handleInputChange('tractor_hours', e.target.value)} min={0} max={1000} step={25}/></Form.Group>
                </div>
                <div className="glass-card mb-4">
                    <h5 className="fw-bold mb-4"><GiPlantSeed className="text-success me-2" />Green Practices</h5>
                    <Form.Group className="mb-3"><Form.Label>Use cover cropping?</Form.Label><div><Form.Check inline label="Yes" name="cover_crop" type="radio" value="Yes" checked={inputs.cover_crop === 'Yes'} onChange={(e) => handleInputChange('cover_crop', e.target.value)} /><Form.Check inline label="No" name="cover_crop" type="radio" value="No" checked={inputs.cover_crop === 'No'} onChange={(e) => handleInputChange('cover_crop', e.target.value)} /></div></Form.Group>
                    <Form.Group><Form.Label>Use renewable energy?</Form.Label><div><Form.Check inline label="Yes" name="renewable_energy" type="radio" value="Yes" checked={inputs.renewable_energy === 'Yes'} onChange={(e) => handleInputChange('renewable_energy', e.target.value)} /><Form.Check inline label="No" name="renewable_energy" type="radio" value="No" checked={inputs.renewable_energy === 'No'} onChange={(e) => handleInputChange('renewable_energy', e.target.value)} /></div></Form.Group>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="d-grid"><button type="submit" className="btn-premium" disabled={loading}>{loading ? <Spinner as="span" size="sm" /> : <><i className="fas fa-calculator me-2"></i>Calculate Emissions</>}</button></div>
            </Form>
        </Container>
    );
};
export default CarbonCalculator;