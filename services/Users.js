const models = require('../models/Users');

const getAll = async () => {
  const result = await models.getAll();
  return result;
};

module.exports = {
  getAll,
};
