const request = require('supertest');
const app = require('../../src/app');

const user = {
  name: 'Auth',
  email: `${Date.now()}@gmail.com`,
  pass: '123'
};

test('Should return a token when be logged', async () => {
  await app.services.user.create(user);
  const { email, pass } = user;
  const { status, body: { token } } = await request(app).post('/auth/signin').send({ email, pass });

  expect(status).toBe(200);
  expect(token).not.toBeUndefined();
});
