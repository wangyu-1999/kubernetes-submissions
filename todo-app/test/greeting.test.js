import supertest from 'supertest';
import { describe, it, expect } from 'vitest';

import app from '../src/app.js';

const api = supertest(app);

describe('Greeting API', () => {
  it('should return a default greeting with status 200', async () => {
    const response = await api.get('/api/greet');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, Stranger!' });
  });

  it('should return a custom greeting when a name is provided', async () => {
    const response = await api.get('/api/greet?name=Vitest');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, Vitest!' });
  });
});
