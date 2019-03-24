const request = require('supertest');
const app = require('../src/app');

test('Should list all users', async () => {
  const res = await request(app).get('/users');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  const [user] = res.body;
  expect(user).toHaveProperty('name', 'John Doe');
});

test('Should register a new user', async () => {
  const user = {
    name: 'Lucas',
    email: 'lucas@gmail.com'
  };
  const res = await request(app).post('/users').send(user);

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(user.name);
});
