const elegibilityService = require('../../services/elegibility');

module.exports = (req, res, next) => {
  try {
    const response = elegibilityService.check(req.body);

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
