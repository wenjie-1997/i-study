const User = require("../models/user");
const Student = require("../models/student");
const constants = require("../utilities/constants");

class StudentController {
  getList = async (req, res, next) => {
    try {
      const result = await User.viewUsers(2);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  put = async (req, res, next) => {
    console.log(req.body);
    try {
      const result = await Student.put(req.body);
      console.log(result);
      res.json("Update successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new StudentController();
