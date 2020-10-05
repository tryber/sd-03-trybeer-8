const errorHandler = (error, _req, res, _next) => {
<<<<<<< HEAD
  console.log(error);
  if (error.info.code === 1062) {
=======
  if (error.info && error.info.code === 1062) {
>>>>>>> 0378fcaab498d5de67deb09d5667e8fdacb12024
    return res.status(409).json({ message: error.message });
  }

  if (error.message) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message, stack: error.stack });
};

module.exports = { errorHandler };
