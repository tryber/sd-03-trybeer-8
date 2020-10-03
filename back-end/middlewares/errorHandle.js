const errorHandler = (error, _req, res, _next) => {

  if (error.info && error.info.code === 1062) {
    return res.status(409).json({ message: error.message });
  }

  if (error.message) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message, stack: error.stack });
};

module.exports = { errorHandler };
