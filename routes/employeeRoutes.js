const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/add", employeeController.addEmployee);
router.get("/", employeeController.getEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
