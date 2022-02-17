const models = require('../models/Users');
const { createToken } = require('../middlewares/auth');

const {
  validateEmail,
  validatePassword,
  validateName,
} = require('../middlewares/validaction');


const create = async (email, name, password) => {
  const loginEmail = await validateEmail(email);
  const loginName = await validateName(name);
  const loginPassword = await validatePassword(password);

  if (loginEmail ==! undefined) {
    return loginEmail;
  }
  
  if (loginPassword ==! undefined) {
    return loginPassword;
  }
  if (loginName ==! undefined) {
    return loginName;
  }

  const result = await models.create(email, name, password);
  if (result) {
    const token = createToken(email);
    return { token };
  }
};

const login = async (email, password) => {
  const loginEmail = await validateEmail(email);
  const loginPassword = await validatePassword(password);
  if (loginEmail ==! undefined) {
    return loginEmail;
  }
  
  if (loginPassword ==! undefined) {
    return loginPassword;
  }
  
  const users = await models.getByEmail(email);
  if (!users) return { message: 'Invalid fields', code: 400 };
  const token = createToken(email);
  return { token };
};

const getAll = async () => {
  const result = await models.getAll();
  return result;
};

module.exports = {
  getAll,
  login,
  create,
};
