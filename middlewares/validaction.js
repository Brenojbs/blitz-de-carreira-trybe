
const validateEmail = async (email) => {
  const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) {
    return { message: '"email" is required', code: 400 };
  }

  if (!reg.test(email)) {
      return {
        message: '"email" must be a valid email',
        code: 400,
      }; 
  }
};

const validatePassword = (password) => {
  if (!password) {
    return {
      message: '"password" is required',
      code: 400,
    };
  }
  if (password.length < 6 || password.length > 6) {
    return {
      message: '"password" length must be 6 characters long',
      code: 400,
    };
  }
};

const validateName = (name) => {
  if (!name) {
    return {
      message: '"name" is required',
      code: 400,
    };
  }
  if (name.length < 3) {
    return {
      message: '"name" length must be 6',
      code: 400,
    };
  }
};

const validateStatus = (status) => {
  if (!status) {
    return {
      message: '"status" is required',
      code: 400,
    };
  }
  if (status.length < 3) {
    return {
      message: '"status" length must be 6',
      code: 400,
    };
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateStatus,
};