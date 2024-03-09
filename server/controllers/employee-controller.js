const User = require("../models/user-model");

//To get all the employees
const getUser = async (req, res) => {
  try {
    const user = await User.find().select({ password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//To get one employee
const getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id }, { password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//To get filtered employees
const getFilteredUser = async (req, res) => {
  try {
    const { location, name, sort } = req.query;

    console.log("This is location", location);
    console.log("This is name", name);
    console.log("This is sort", sort);

    let sortOptions = {};

    // Set sort options based on the provided parameter
    if (sort) {
      const [sortBy, sortOrder] = sort.split(":");
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
      console.log("This is sortOptions", sortOptions);
    }

    const user = await User.find({
      location: { $regex: location, $options: "i" },
      userName: { $regex: name, $options: "i" },
    })
      .select({ password: 0 })
      .sort(sortOptions);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//To update one employee
const updateUser = async (req, res) => {
  try {
    const updatedUserData = req.body;
    const _id = req.params.id;
    console.log("This is updated Data", updatedUserData);

    const updatedUser = await User.updateOne(
      { _id },
      { $set: updatedUserData },
      { new: true }
    );

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//To delete one employee
const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(_id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  getFilteredUser,
};
