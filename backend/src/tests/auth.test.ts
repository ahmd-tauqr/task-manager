import request from 'supertest';
import app from '../index';
import prisma from '../models';
import bcrypt from 'bcryptjs';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Create the test user if it doesn't exist
    await prisma.user.deleteMany({ where: { email: 'testuser@example.com' } });
    await prisma.user.create({
      data: {
        email: 'testuser@example.com',
        password: await bcrypt.hash('password123', 10),
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({ where: { email: 'newuser@example.com' } });
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/v1/auth/register').send({
      email: 'newuser@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'newuser@example.com');
  }, 10000); // Set timeout to 10 seconds

  it('should login the user', async () => {
    const res = await request(app).post('/v1/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logged in successfully');
  }, 10000); // Set timeout to 10 seconds

  it('should get the current user', async () => {
    const loginRes = await request(app).post('/v1/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    const res = await request(app)
      .get('/v1/auth/me')
      .set('Cookie', loginRes.headers['set-cookie']);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'testuser@example.com'); // Ensure the email is in the response body
  }, 10000); // Set timeout to 10 seconds
});
