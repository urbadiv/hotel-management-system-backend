const Role = require("../models/role");

exports.addRole = async (req, res) => {
  const { role, salary, maxEmployees } = req.body;

  try {
    const newRole = new Role({ role, salary, maxEmployees });
    await newRole.save();
    res.status(201).json({ message: "Role added successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Error adding role", error });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role, salary, maxEmployees } = req.body;

  // Validate incoming data
  if (!id) {
    return res.status(400).json({ message: "Role ID is required." });
  }
  if (!role || !salary || !maxEmployees) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { role, salary, maxEmployees },
      { new: true } // Ensures the updated document is returned
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", role: updatedRole });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Error updating role", error });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await Role.findByIdAndDelete(id);
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
