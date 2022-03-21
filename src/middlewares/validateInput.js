const validationService = require('../services/validation');

module.exports = (req, _res, next) => {
  const { error } = validationService.input(req.body);

  if (error) {
    return next({
      statusCode: 400,
      code: 'bad_request',
      message: error.message,
    });
  }

  return next();
};
