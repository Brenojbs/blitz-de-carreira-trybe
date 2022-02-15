const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('5 - Sua aplicação deve ter o endpoint DELETE `/delete/:id`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será verificado que é possível deletado um afazer com sucesso', async () => {
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
            'Content-Type': 'applicattion/json',
          },
        },
      })
      .delete(`${url}/delete/1`)
      .expect('status', 204);
  });
});
