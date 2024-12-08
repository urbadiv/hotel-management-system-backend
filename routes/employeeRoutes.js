const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// Protected: Require authentication for the following routes
router.use(verifyToken);

router.post("/add", authorizeRole("admin"), employeeController.addEmployee);
router.get("/", employeeController.getEmployees);
router.put("/:id", authorizeRole("admin"), employeeController.updateEmployee);
router.delete(
  "/:id",
  authorizeRole("admin"),
  employeeController.deleteEmployee
);

module.exports = router;
