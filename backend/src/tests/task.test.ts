import request from 'supertest';
import app from '../index';
import prisma from '../models';
import bcrypt from 'bcryptjs';

describe('Task Endpoints', () => {
  const testEmail = `testuser+${Date.now()}@example.com`;
  let cookie: string;
  let userId: number;

  beforeAll(async () => {
    // Create the test user and login to get the cookie
    await prisma.user.deleteMany({ where: { email: testEmail } });
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: await bcrypt.hash('password123', 10),
      },
    });
    userId = user.id;

    const loginRes = await request(app).post('/v1/auth/login').send({
      email: testEmail,
      password: 'password123',
    });
    cookie = loginRes.headers['set-cookie'];
  }, 20000); // Set timeout to 20 seconds

  afterAll(async () => {
    // Clean up test data
    await prisma.task.deleteMany({ where: { userId: userId } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/v1/tasks')
      .set('Cookie', cookie)
      .send({
        title: 'New Test Task',
        description: 'This is a new test task',
        status: 'To Do',
        userId: userId,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'New Test Task');
  }, 20000); // Set timeout to 20 seconds

  it('should get tasks', async () => {
    // Create a task to ensure there's something to get
    await prisma.task.create({
      data: {
        title: 'Existing Task',
        description: 'This is an existing task',
        status: 'To Do',
        userId: userId,
      },
    });

    const res = await request(app).get('/v1/tasks').set('Cookie', cookie);
    expect(res.statusCode).toEqual(200);
    expect(res.body.tasks.length).toBeGreaterThan(0);
  }, 20000); // Set timeout to 20 seconds

  it('should update a task', async () => {
    // Create a task to update
    const task = await prisma.task.create({
      data: {
        title: 'Task to Update',
        description: 'This task will be updated',
        status: 'To Do',
        userId: userId,
      },
    });

    const res = await request(app)
      .put(`/v1/tasks/${task.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'Updated Test Task',
        description: 'This is an updated test task',
        status: 'In Progress',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Task');
  }, 20000); // Set timeout to 20 seconds

  it('should delete a task', async () => {
    // Create a task to delete
    const task = await prisma.task.create({
      data: {
        title: 'Task to Delete',
        description: 'This task will be deleted',
        status: 'To Do',
        userId: userId,
      },
    });

    const res = await request(app)
      .delete(`/v1/tasks/${task.id}`)
      .set('Cookie', cookie);
    expect(res.statusCode).toEqual(204);
  }, 20000); // Set timeout to 20 seconds

  it('should fail to create a task without a title', async () => {
    const res = await request(app)
      .post('/v1/tasks')
      .set('Cookie', cookie)
      .send({
        description: 'This task has no title',
        status: 'To Do',
        userId: userId,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Task title is required');
  }, 20000); // Set timeout to 20 seconds
});
