const service = require('../services/Assignments');

const SUCESS_204 = 204;
const ERROR_422 = 422;

const del = async (req, res, _next) => {
  const { id } = req.params;

  const result = await service.del(id);
  if (result) return res.status(SUCESS_204).json();

  return res.status(ERROR_422).json(result);
};

module.exports = {
  del,
};
