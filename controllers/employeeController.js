const Employee = require("../models/employee");
const Role = require("../models/role");

exports.addEmployee = async (req, res) => {
  const { name, address, phone, nic, role } = req.body;

  try {
    // Find the role by name
    const roleDetails = await Role.findOne({ role });
    if (!roleDetails) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Check if the number of employees has exceeded the limit for this role
    const employeeCount = await Employee.countDocuments({
      role: roleDetails._id,
    });
    if (employeeCount >= roleDetails.maxEmployees) {
      return res.status(400).json({
        message: `Cannot add more than ${roleDetails.maxEmployees} employees for the role ${role}`,
      });
    }

    // Create a new employee with the role _id
    const newEmployee = new Employee({
      name,
      address,
      phone,
      nic,
      role: roleDetails._id, // Use the ObjectId of the role
      salary: roleDetails.salary,
    });

    // Save the new employee to the database
    await newEmployee.save();
    res.status(201).json({
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error adding employee", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("role");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params; // Employee ID to update
  const { name, address, phone, nic, role } = req.body; // Updated details

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If the role is being changed, check the number of employees for the new role
    if (role && role !== employee.role) {
      const roleDetails = await Role.findOne({ role });
      if (!roleDetails) {
        return res.status(404).json({ message: "Role not found" });
      }

      // Check if the number of employees has exceeded the limit for the new role
      const employeeCount = await Employee.countDocuments({
        role: roleDetails._id,
      });
      if (employeeCount >= roleDetails.maxEmployees) {
        return res.status(400).json({
          message: `Cannot have more than ${roleDetails.maxEmployees} employees for the role ${role}`,
        });
      }

      // Update the employee's role to the new role
      employee.role = roleDetails._id; // Use the ObjectId for the role
    }

    // Update the employee details
    employee.name = name || employee.name;
    employee.address = address || employee.address;
    employee.phone = phone || employee.phone;
    employee.nic = nic || employee.nic;

    // Save the updated employee
    await employee.save();
    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error updating employee", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
