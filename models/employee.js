const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Phone number must have exactly 10 digits
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  nic: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{12}/.test(v); // NIC number must have exactly 12 digits
      },
      message: (props) => `${props.value} is not a valid NIC number!`,
    },
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }, // Reference to Role model
  salary: { type: Number, required: true }, // Inferred from Role
  dateJoined: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
