const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

Describe('1 - Sua aplicação deve ter o endpoint POST `/user`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
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
      expct(json.token).not.toBeNull();
    });
  });
})