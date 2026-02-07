import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

describe('Server API Tests', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('GET / should return running status', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Running');
    });

    test('GET /api/csrf-token should return CSRF token', async () => {
        const res = await request(app).get('/api/csrf-token');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('csrfToken');
        expect(typeof res.body.csrfToken).toBe('string');
    });

    test('POST /api/chat without CSRF token should fail', async () => {
        const res = await request(app)
            .post('/api/chat')
            .send({ message: 'test', threadId: '123' });
        expect(res.status).toBe(403);
    });
});
