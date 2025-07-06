import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { getMissions, completeMission } from '../api/api';
import { FaFlagCheckered, FaCheckCircle } from 'react-icons/fa';

const Missions = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completingId, setCompletingId] = useState(null);

    useEffect(() => {
        getMissions()
            .then(response => setMissions(response.data || []))
            .catch(() => setError('Failed to load missions.'))
            .finally(() => setLoading(false));
    }, []);

    const handleComplete = async (missionId, reward) => {
        setCompletingId(missionId);
        try {
            await completeMission(missionId);
            toast.success(`Mission Complete! +${reward} Credits`);
            setMissions(prev => prev.map(m => m.id === missionId ? { ...m, completed: true } : m));
        } catch (err) {
            toast.error('Could not complete mission.');
        } finally {
            setCompletingId(null);
        }
    };
    
    const activeMissions = missions?.filter(m => !m.completed) || [];
    const completedMissions = missions?.filter(m => m.completed) || [];

    const renderLoading = () => (
        <>
            <h2 className="fs-4 fw-bold mt-4 mb-3"><Skeleton width={200} /></h2>
            <div className="mission-list-item mb-3"><Skeleton height={40} /></div>
            <div className="mission-list-item mb-3"><Skeleton height={40} /></div>
            <h2 className="fs-4 fw-bold mt-5 mb-3"><Skeleton width={150} /></h2>
            <div className="mission-list-item mb-3"><Skeleton height={40} /></div>
        </>
    );

    if (error) return <Container><Alert variant="danger" className="mt-3">{error}</Alert></Container>;

    return (
        <Container fluid="md">
            <h1 className="page-title">Sustainability Missions</h1>
            <p className="page-subtitle">Complete tasks to earn credits and improve your score.</p>
            {loading ? renderLoading() : (
                <>
                    <h2 className="fs-4 fw-bold mt-4 mb-3">Active Missions</h2>
                    {activeMissions.length > 0 ? activeMissions.map(m => (
                        <div key={m.id} className="mission-list-item d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="fw-bold">{m.title}</div>
                                <small className="text-success">+{m.reward} Carbon Credits</small>
                            </div>
                            <button className="btn-premium" style={{padding: '8px 20px', fontSize: '0.9rem'}} onClick={() => handleComplete(m.id, m.reward)} disabled={completingId === m.id}>
                                {completingId === m.id ? <Spinner size="sm" /> : 'Complete'}
                            </button>
                        </div>
                    )) : <p className="text-muted">No active missions. Great job!</p>}

                    <h2 className="fs-4 fw-bold mt-5 mb-3">Completed</h2>
                    {completedMissions.map(m => (
                        <div key={m.id} className="mission-list-item completed mb-3">
                            <FaCheckCircle className="text-success me-2" />
                            <span>{m.title}</span>
                        </div>
                    ))}
                </>
            )}
        </Container>
    );
};
export default Missions;