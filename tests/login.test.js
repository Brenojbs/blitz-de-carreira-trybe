const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoDbUrl = `mongodb://${process.env.HOST || 'mongodb'}:27017/to_do_list`;

const url = 'http://localhost:3000';

describe('2 - Sua aplicação deve ter o endpoint POST `/login`', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('to_do_list');
    await db.collection('user').deleteMany({});
    await db.collection('assignment').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('user').deleteMany({});
    await db.collection('assignment').deleteMany({});
    const user = {
        name: 'Pedro Calabrez',
        email: 'neurovox@gmail.com',
        password: '123456'
      };
    await db.collection('user').insertOne(user);
  });

  afterEach(async () => {
    await db.collection('user').deleteMany({});
    await db.collection('assignment').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será verificado que é possivel fazer login', async () => {
    await frisby
      .post(`${url}/login`,
      {
        email: 'neurovox@gmail.com',
        password: '123456'
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).not.toBeNull();
      });
  });
  
});