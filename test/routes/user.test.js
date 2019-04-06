const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const user = {
  name: 'User test',
  email: `${Date.now()}@gmail.com`,
  pass: '123'
};
let userAuth;

beforeAll(async () => {
  const userCreate = {
    name: 'User test auth',
    email: `${Date.now()}@gmail.com`,
    pass: '123'
  };

  const [res] = await app.services.user.create(userCreate);
  userAuth = { ...res };
  userAuth.token = jwt.encode(userAuth, app.constant.utils.jwtSecret);
});

test('Should list all users', async () => {
  const { status } = await request(app).get('/users')
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(200);
});

test('Should register a new user', async () => {
  const { status, body } = await request(app).post('/users').send(user)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(201);
  expect(body.name).toBe(user.name);
  expect(body).not.toHaveProperty('pass');
});

test('Should register a new user with password encryption', async () => {
  const userCopy = { ...user };
  userCopy.email = `${Date.now()}@gmail.com`;
  const { status, body: { id } } = await request(app).post('/users').send(userCopy)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(201);
  const { pass } = await app.services.user.findOne({ id });
  expect(pass).not.toBeUndefined();
  expect(pass).not.toBe(userCopy.pass);
});

test('Should not register a new user without name', async () => {
  const userCopy = { ...user };
  delete userCopy.name;
  const { status, body: { message, type } } = await request(app).post('/users').send(userCopy)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(400);
  expect(message).toBe(`Nome ${app.constant.messages.requiredField}`);
  expect(type).toBe(app.constant.utils.validationError);
});

test('Should not register a new user without email', async () => {
  const userCopy = { ...user };
  delete userCopy.email;
  const { status, body: { message, type } } = await request(app).post('/users').send(userCopy)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(400);
  expect(message).toBe(`Email ${app.constant.messages.requiredField}`);
  expect(type).toBe(app.constant.utils.validationError);
});

test('Should not register a new user without password', async () => {
  const userCopy = { ...user };
  delete userCopy.pass;
  const { status, body: { message, type } } = await request(app).post('/users').send(userCopy)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(400);
  expect(message).toBe(`Senha ${app.constant.messages.requiredField}`);
  expect(type).toBe(app.constant.utils.validationError);
});

test('Should not register a new user with duplicate email', async () => {
  const { status, body: { message, type } } = await request(app).post('/users').send(user)
    .set('authorization', `Bearer ${userAuth.token}`);

  expect(status).toBe(400);
  expect(message).toBe(app.constant.messages.duplicateEmail);
  expect(type).toBe(app.constant.utils.validationError);
});
