const request = require('supertest');
const app = require('../../src/app');

const user = {
  name: 'Lucas',
  email: `${Date.now()}@gmail.com`,
  pass: '123'
};

test('Should list all users', async () => {
  const { status } = await request(app).get('/users');

  expect(status).toBe(200);
});

test('Should register a new user', async () => {
  const { status, body } = await request(app).post('/users').send(user);

  expect(status).toBe(201);
  expect(body.name).toBe(user.name);
});

test('Should not register a new user without name', async () => {
  const userCopy = { ...user };
  delete userCopy.name;
  const { status, body } = await request(app).post('/users').send(userCopy);

  expect(status).toBe(400);
  expect(body).toBe(`Nome ${app.constant.messages.requiredField}`);
});

test('Should not register a new user without email', async () => {
  const userCopy = { ...user };
  delete userCopy.email;
  const { status, body } = await request(app).post('/users').send(userCopy);

  expect(status).toBe(400);
  expect(body).toBe(`Email ${app.constant.messages.requiredField}`);
});

test('Should not register a new user without password', async () => {
  const userCopy = { ...user };
  delete userCopy.pass;
  const { status, body } = await request(app).post('/users').send(userCopy);

  expect(status).toBe(400);
  expect(body).toBe(`Senha ${app.constant.messages.requiredField}`);
});

test('Should not register a new user with duplicate email', async () => {
  const { status, body } = await request(app).post('/users').send(user);

  expect(status).toBe(400);
  expect(body).toBe(app.constant.messages.duplicateEmail);
});
