const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('3 - Sua aplicação deve ter o endpoint POST `/new`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será verificado que é possivel cadastrar um afazer com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
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
        toDo: 'Reunião com associados'
      })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.toDo).toBe('Reunião com associados');
      });
  });
});