const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('4 - Sua aplicação deve ter o endpoint PUT `/edit/:id`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será verificado que é possível editar um afazer com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'casadosaber@gmail.com',
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
      .put(`${url}/edit/1`, {
        status: 'pronto'
      })
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.status).toBe('pronto');
      });
  });
});
