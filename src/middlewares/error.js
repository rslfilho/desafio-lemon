module.exports = (err, _req, res, _next) => {
  if (err.statusCode && err.message) {
    const { statusCode, message } = err;
    
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: 'Internal Error' });
};
