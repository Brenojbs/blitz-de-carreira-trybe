const service = require('../services/Users');
//  aqui eu começo a criar as fuções para concluir as rotas.
const SUCESS_200 = 200;
const ERROR_422 = 422;

const getAll = async (_req, res, next) => {
  try {
    const result = await service.getAll();

    if (result.err) return res.status(ERROR_422).json(result);
    return res.status(SUCESS_200).json(result);
  } catch (err) {
    console.log(err.erro);
    return next(err);
  }
};

module.exports = {
  getAll,
};