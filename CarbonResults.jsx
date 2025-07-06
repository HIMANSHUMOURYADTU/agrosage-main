import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaLightbulb } from 'react-icons/fa';
ChartJS.register(ArcElement, Tooltip, Legend);

function CarbonResults() {
    const location = useLocation();
    const result = location.state?.result;

    if (!result) {
        return (
            <Container className="text-center my-5 page-container">
                <Alert variant="warning">No calculation data found.</Alert>
                <Link to="/carbon-calculator" className="btn-premium">Go to Calculator</Link>
            </Container>
        );
    }

    const { totalEmissions, categoryEmissions, recommendations } = result;
    const chartData = {
        labels: Object.keys(categoryEmissions),
        datasets: [{
            data: Object.values(categoryEmissions),
            backgroundColor: ['#1A4D2E', '#4F6F52', '#F5EFE6', '#FF9800'],
            borderColor: ['#FAF3E3'], borderWidth: 3,
        }],
    };
    const chartOptions = { plugins: { legend: { position: 'bottom' } } };

    return (
        <Container fluid="md">
            <h1 className="page-title">Carbon Footprint Results</h1>
            <Row>
                <Col md={12} className="mb-4">
                    <div className="glass-card text-center" style={{ background: 'linear-gradient(135deg, var(--primary-green), var(--accent-green))', color: 'white' }}>
                        <h6 className="fw-light" style={{ opacity: 0.8 }}>Total Farm Footprint</h6>
                        <p className="display-4 fw-bold mb-0">{totalEmissions.toFixed(2)}</p>
                        <p>tonnes CO2e/year</p>
                    </div>
                </Col>
                <Col lg={7} className="mb-4">
                    <div className="glass-card h-100 text-center"><h5 className="fw-bold mb-3">Emissions Distribution</h5><div style={{ height: '280px' }}><Doughnut data={chartData} options={chartOptions}/></div></div>
                </Col>
                <Col lg={5} className="mb-4">
                    <div className="glass-card h-100"><h5 className="fw-bold mb-3">Breakdown</h5>
                        {Object.entries(categoryEmissions).map(([key, value]) => (
                            <div key={key} className="d-flex justify-content-between py-2 border-bottom"><span>{key}</span><strong>{value.toFixed(2)} t</strong></div>
                        ))}
                    </div>
                </Col>
                <Col xs={12} className="mb-4">
                    <div className="glass-card"><h5 className="fw-bold mb-3"><FaLightbulb className="text-warning me-2" />Smart Recommendations</h5>
                        {recommendations.map((rec) => (<p key={rec.id} className="mb-2"><i className="fas fa-leaf text-success me-2"></i>{rec.details}</p>))}
                    </div>
                </Col>
                <Col xs={12} className="text-center">
                    <Link to="/carbon-calculator" className="btn btn-outline-secondary">Calculate Again</Link>
                </Col>
            </Row>
        </Container>
    );
}
export default CarbonResults;