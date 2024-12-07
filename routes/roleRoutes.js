const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// Protected: Require authentication for the following routes
router.use(verifyToken);

router.post("/add", authorizeRole(["admin"]), roleController.addRole);
router.get("/", roleController.getRoles);
router.put("/:id", authorizeRole(["admin"]), roleController.updateRole);
router.delete("/:id", authorizeRole(["admin"]), roleController.deleteRole);

module.exports = router;
