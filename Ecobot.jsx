import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { askEcoBot } from './api.js';
import { motion, AnimatePresence } from 'framer-motion';

const EcoBot = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I\'m EcoBot. Ask me about sustainable farming.' }]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        const userMessage = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setQuery('');
        try {
            const response = await askEcoBot(query);
            setMessages(prev => [...prev, { sender: 'bot', text: response.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I\'m having trouble connecting.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <Link to="/" className="back-button"><i className="fas fa-arrow-left"></i></Link>
                <h1 className="page-title mb-0 fs-4">EcoBot Assistant</h1>
            </header>
            <div className="chat-body">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                            <div className={`chat-message ${msg.sender}`}>{msg.text}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {loading && <div className="d-flex justify-content-start mb-3"><div className="chat-message bot"><Spinner animation="grow" size="sm" /></div></div>}
                <div ref={chatEndRef} />
            </div>
            <footer className="chat-footer">
                <Form onSubmit={handleAsk}>
                    <InputGroup size="lg">
                        <Form.Control type="text" placeholder="Ask about crops, soil, etc." value={query} onChange={(e) => setQuery(e.target.value)} disabled={loading} autoFocus />
                        <Button variant="success" type="submit" disabled={loading || !query.trim()}><i className="fas fa-paper-plane"></i></Button>
                    </InputGroup>
                </Form>
            </footer>
        </div>
    );
};
export default EcoBot;
