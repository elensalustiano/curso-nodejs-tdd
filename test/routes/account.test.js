const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let account;
let token;

beforeAll(async () => {
  const userCreate = {
    name: 'Accounts',
    email: `${Date.now()}@gmail.com`,
    pass: '123'
  };

  const [res] = await app.services.user.create(userCreate);
  token = jwt.encode(res, app.constant.utils.jwtSecret);
  account = {
    name: 'ACC #test',
    user_id: res.id
  };
});

test('Should register a new account', async () => {
  const { status, body } = await request(app).post(MAIN_ROUTE).send(account)
    .set('authorization', `Bearer ${token}`);

  expect(status).toBe(201);
  expect(body.name).toBe(account.name);
});

test('Should not register a new account without name', async () => {
  const myAccount = { ...account };
  delete myAccount.name;
  const { status, body: { message, type } } = await request(app).post(MAIN_ROUTE).send(myAccount)
    .set('authorization', `Bearer ${token}`);

  expect(status).toBe(400);
  expect(message).toBe(`Nome ${app.constant.messages.requiredField}`);
  expect(type).toBe(app.constant.utils.validationError);
});

test('Should list all accounts', async () => {
  await app.db('accounts').insert(account);
  const { status, body } = await request(app).get(MAIN_ROUTE).set('authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body.length).toBeGreaterThan(0);
});

test('Should return account by id', async () => {
  const [{ id }] = await app.db('accounts').insert(account, ['id']);
  const newAccount = {
    ...account,
    id
  };
  const { status, body } = await request(app).get(`${MAIN_ROUTE}/${id}`)
    .set('authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body).toEqual(newAccount);
});

test('Should alter a account', async () => {
  const update = {
    name: 'ACC updated'
  };

  const [{ id }] = await app.db('accounts').insert(account, ['id']);
  const { status, body } = await request(app).patch(`${MAIN_ROUTE}/${id}`)
    .send(update).set('authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body.name).not.toBe(account.name);
  expect(body.name).toBe(update.name);
});

test('Should delete a account by id', async () => {
  const [{ id }] = await app.db('accounts').insert(account, ['id']);

  const { status } = await request(app).delete(`${MAIN_ROUTE}/${id}`)
    .set('authorization', `Bearer ${token}`);

  expect(status).toBe(204);
});
