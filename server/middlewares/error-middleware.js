const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";

  return res.status(status).send({ message });
};

module.exports = errorMiddleware;
