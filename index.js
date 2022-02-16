const app = require('express')();

const bodyParser = require('body-parser');
require('dotenv').config();

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.get('/user', userController.getAll);
app.post('/user', userController.create);
app.post('/login', loginController.login);

app.listen(PORT, () => {
  console.log(`App ouvindo porta ${PORT}`);
});