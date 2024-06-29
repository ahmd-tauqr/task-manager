import request from 'supertest';
import app from '../index';
import prisma from '../models';
import bcrypt from 'bcryptjs';

describe('Auth Endpoints', () => {
  const testEmail = `testuser+${Date.now()}@example.com`;
  const newUserEmail = `newuser+${Date.now()}@example.com`;

  beforeAll(async () => {
    // Create the test user if it doesn't exist
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.user.create({
      data: {
        email: testEmail,
        password: await bcrypt.hash('password123', 10),
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({ where: { email: newUserEmail } });
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/v1/auth/register').send({
      email: newUserEmail,
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', newUserEmail);
  }, 20000); // Set timeout to 20 seconds

  it('should login the user', async () => {
    const res = await request(app).post('/v1/auth/login').send({
      email: testEmail,
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logged in successfully');
  }, 20000); // Set timeout to 20 seconds

  it('should fail to login with wrong password', async () => {
    const res = await request(app).post('/v1/auth/login').send({
      email: testEmail,
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  }, 20000); // Set timeout to 20 seconds
});
