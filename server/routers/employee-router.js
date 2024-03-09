const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const employeeControllers = require("../controllers/employee-controller");

router.route("/all-emp").get(employeeControllers.getUser);
router
  .route("/get-emp/:id")
  .get(authMiddleware, adminMiddleware, employeeControllers.getUserById);
router
  .route("/filter-emp")
  .get(authMiddleware, adminMiddleware, employeeControllers.getFilteredUser);
router;
router
  .route("/update-emp/:id")
  .patch(authMiddleware, adminMiddleware, employeeControllers.updateUser);
router
  .route("/delete-emp/:id")
  .delete(authMiddleware, adminMiddleware, employeeControllers.deleteUser);

module.exports = router;
