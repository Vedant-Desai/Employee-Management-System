const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const departmentControllers = require("../controllers/department-controller");

router
  .route("/all-dept")
  .get(authMiddleware, adminMiddleware, departmentControllers.getDepartment);
router
  .route("/create-dept")
  .post(
    authMiddleware,
    adminMiddleware,
    departmentControllers.createDepartment
  );
router
  .route("/update-dept/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    departmentControllers.updateDepartment
  );
router
  .route("/delete-dept/:id")
  .delete(
    authMiddleware,
    adminMiddleware,
    departmentControllers.deleteDepartment
  );

module.exports = router;
