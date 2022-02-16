const service = require('../services/Assignments');

const SUCESS_201 = 201;

const create = async (req, res, _next) => {
  const { name, status } = req.body;
  const result = await service.create(name, status);
  if (result.code) return res.status(result.code).json(result.message);

  return res.status(SUCESS_201).json(result);
};

module.exports = {
  create,
};
