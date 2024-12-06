const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  salary: { type: Number, required: true },
  maxEmployees: { type: Number, required: true },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
