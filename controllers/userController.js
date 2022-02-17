const service = require('../services/Users');

const SUCESS_200 = 200;
const SUCESS_201 = 201;

const getAll = async (_req, res, next) => {
  try {
    const result = await service.getAll();

    if (result.code) return res.status(result.code).json(result.message);
    return res.status(SUCESS_200).json(result);
  } catch (err) {
    console.log(err.erro);
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const result = await service.create(email, name, password);
    
    if (result.err) return res.status(result.code).json(result.message);
    return res.status(SUCESS_201).json(result);
  } catch (err) {
    console.log(err.erro);
    return next(err);
  }
};

module.exports = {
  getAll,
  create,
};