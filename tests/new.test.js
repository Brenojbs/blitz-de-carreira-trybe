const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = 'http://localhost:3000';

describe('3 - Sua aplicação deve ter o endpoint POST `/new`', () => {
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

  beforeEach(() => {
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

  it('Será verificado que é possivel cadastrar um afazer com sucesso', async () => {
    let token;
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
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/new`, {
        name: 'Reunião com associados',
        status: 'pendente'
      })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.name).toBe('Reunião com associados')
        expect(json.status).toBe('pendente');
      });
  });
});