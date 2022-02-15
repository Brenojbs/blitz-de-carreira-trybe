const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('2 - Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será verificado que é possivel fazer login', async () => {
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
        expect(result.token).not.toBeNull();
      });
  });
  
});