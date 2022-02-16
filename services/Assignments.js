const models = require('../models/Assignments');

const {
  validateStatus,
  validateName,
} = require('../middlewares/validaction');


const create = async (name, status) => {
  const loginName = await validateName(name);
  const loginStatus = await validateStatus(status);

  if (loginStatus ==! undefined) {
    return loginStatus;
  }
  if (loginName ==! undefined) {
    return loginName;
  }

  const result = await models.create(name, status);
  console.log(result);

  return result;
};

module.exports = {
  create,
};
