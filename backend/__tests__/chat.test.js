import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

describe('Chat Routes Tests', () => {
    let csrfToken;
    let cookies;

    beforeAll(async () => {
        const res = await request(app).get('/api/csrf-token');
        csrfToken = res.body.csrfToken;
        cookies = res.headers['set-cookie'];
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('GET /api/thread should return all threads', async () => {
        const res = await request(app)
            .get('/api/thread')
            .set('Cookie', cookies);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);

    test('POST /api/chat without message should fail', async () => {
        const res = await request(app)
            .post('/api/chat')
            .set('Cookie', cookies)
            .set('X-CSRF-Token', csrfToken)
            .send({ threadId: '123' });
        expect(res.status).toBe(400);
    });

    test('GET /api/thread/:threadId with invalid ID should return 404', async () => {
        const res = await request(app)
            .get('/api/thread/invalid-id-999')
            .set('Cookie', cookies);
        expect(res.status).toBe(404);
    });
});
