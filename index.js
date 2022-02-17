const app = require('express')();

const bodyParser = require('body-parser');
require('dotenv').config();

const auth = require('./middlewares/auth');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const newController = require('./controllers/newController');
const editController = require('./controllers/editController');
const deleteController = require('./controllers/deleteController');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.get('/user', userController.getAll);
app.post('/user', userController.create);
app.post('/login', loginController.login);
app.post('/new', auth.checkToken, newController.create);
app.put('/edit/:id', auth.checkToken, editController.upDate);
app.delete('/delete/:id', auth.checkToken, deleteController.del);

app.listen(PORT, () => {
  console.log(`App ouvindo porta ${PORT}`);
});