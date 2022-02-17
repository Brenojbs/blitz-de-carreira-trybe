const service = require('../services/Assignments');

const SUCESS_200 = 200;

const upDate = async (req, res, _next) => {
  const { status } = req.body;
  const { id } = req.params;

  const result = await service.upDate(id, status);
  if (result.code) return res.status(result.code).json(result.message);

  return res.status(SUCESS_200).json(result);
};

module.exports = {
  upDate,
};
