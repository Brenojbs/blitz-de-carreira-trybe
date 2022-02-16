const service = require('../services/Users');

const SUCESS_200 = 200;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.login(email, password);
    console.log(result);

    if (result.code) return res.status(result.code).json(result.message);
    return res.status(SUCESS_200).json(result);
  } catch (err) {
    console.log(err.erro);
    return next(err);
  }
};
module.exports = {
  login,
};
