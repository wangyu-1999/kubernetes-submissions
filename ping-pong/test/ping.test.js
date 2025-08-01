import supertest from 'supertest';
import { describe, it, expect } from 'vitest';

import app from '../src/app.js';

const api = supertest(app);

describe('ping pong api', () => {
  it('should return a ping object with status 200', async () => {
    const response = await api.get('/api/ping');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ pong: 0 });
  });

  it('should increment pong on subsequent requests', async () => {
    const resetResponse = await api.post('/api/ping/reset');
    expect(resetResponse.statusCode).toBe(200);
    expect(resetResponse.body).toEqual({ pong: -1 });

    const firstResponse = await api.get('/api/ping');
    expect(firstResponse.body).toEqual({ pong: 0 });

    const secondResponse = await api.get('/api/ping');
    expect(secondResponse.body).toEqual({ pong: 1 });

    const thirdResponse = await api.get('/api/ping');
    expect(thirdResponse.body).toEqual({ pong: 2 });
  });
});
