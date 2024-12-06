const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/add", roleController.addRole);
router.get("/", roleController.getRoles);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
