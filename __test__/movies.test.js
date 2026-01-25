import { describe, test } from '@jest/globals';
import request from 'supertest'
import { app } from "/app.js";

describe('Movie list page', () => {
    test('lists movies from API', async () => {
      await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
    });
});