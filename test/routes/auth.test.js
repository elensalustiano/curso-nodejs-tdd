const request = require('supertest');
const app = require('../../src/app');

const user = {
  name: 'Auth',
  email: `${Date.now()}@gmail.com`,
  pass: '123'
};

beforeAll(async () => {
  await app.services.user.create(user);
});

test('should register a new user through signup route', async () => {
  const newUser = { ...user };
  newUser.email = `${Date.now()}@gmail.com`;

  const { status, body } = await request(app).post('/auth/signup').send(newUser);

  expect(status).toBe(201);
  expect(newUser.name).toBe(body.name);
  expect(newUser.email).toBe(body.email);
  expect(body).not.toHaveProperty('pass');
});

test('Should return a token when be logged', async () => {
  const { email, pass } = user;
  const { status, body: { token } } = await request(app).post('/auth/signin').send({ email, pass });

  expect(status).toBe(200);
  expect(token).not.toBeUndefined();
});

test('Should not authenticated user with incorrect password', async () => {
  const { email } = user;
  const pass = 'diferente';
  const { status, body: { message } } = await request(app).post('/auth/signin').send({ email, pass });

  expect(status).toBe(400);
  expect(message).toBe(app.constant.messages.signinError);
});

test('Should not authenticated user with incorret email', async () => {
  const { pass } = user;
  const email = 'incorreto@gmail.com';
  const { status, body: { message } } = await request(app).post('/auth/signin').send({ email, pass });

  expect(status).toBe(400);
  expect(message).toBe(app.constant.messages.signinError);
});

test('Should not access a protected route without token', async () => {
  const { status } = await request(app).get('/users');

  expect(status).toBe(401);
});
