const adminMiddleware = (req, res, next) => {
  try {
    const isManager = req.isManager;
    console.log("isManager", isManager);

    if (!isManager) {
      res.status(403).send({ message: "Access Denied. You are not an admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
