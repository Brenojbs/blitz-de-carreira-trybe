const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();

const { userController, loginController } = require('./controllers');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
})

app.post('/user', userController);
app.post('/login', loginController);

app.listen(PORT, () => {
  console.log(`App ouvindo porta ${PORT}`);
});