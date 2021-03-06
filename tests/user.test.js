const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoDbUrl = `mongodb://${process.env.HOST || 'mongodb'}:27017/to_do_list`;

const url = 'http://localhost:3000';

describe('1 - Sua aplicação deve ter o endpoint POST e GET`/user`', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('to_do_list');
    await db.collection('users').deleteMany({});
    await db.collection('assignments').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('assignments').deleteMany({});
    const user = {
        name: 'Pedro Calabrez',
        email: 'neurovox@gmail.com',
        password: '123456'
      };
    await db.collection('users').insertOne(user);
  });

  afterEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('assignments').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possivel cadastrar um usuario com sucesso', async () => {

    await frisby
    .post(`${url}/user`,
    {
      name: 'Carlos',
      email: 'casadosaber@gmail.com',
      password: '123456'
    })
    .expect('status', 201)
    .then((response) => {
      const { json } = response;
      expect(json.token).not.toBeNull();
    });
  });

  it('Será validado que é possivel listar os usuarios com sucesso', async () => {

    await frisby
    .get(`${url}/user`, {})
    .expect('status', 200)
    .then((response) => {
      const { json } = response;
      expect(json[0].name).toBe('Pedro Calabrez');
    });
  });
})