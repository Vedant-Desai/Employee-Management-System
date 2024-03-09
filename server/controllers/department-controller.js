const Department = require("../models/department-model");
// const User = require("../models/user-model");

//Get all department
const getDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    res.status(200).json(department);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Create department
const createDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;

    const deptExist = await Department.findOne({ departmentName });

    if (deptExist) {
      return res.status(400).json({ message: "Department already exist" });
    }

    const createDepartment = await Department.create({ departmentName });
    console.log(createDepartment);
    res.status(200).json(createDepartment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update department
const updateDepartment = async (req, res) => {
  try {
    const _id = req.params.id;
    const { departmentName } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      _id,
      { departmentName },
      { new: true }
    );
    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Delete department
const deleteDepartment = async (req, res) => {
  try {
    const _id = req.params.id;

    const deletedDepartment = await Department.findByIdAndDelete(_id);

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getDepartment,
  updateDepartment,
  createDepartment,
  deleteDepartment,
};
