const User = require("../models/user");
const Teacher = require("../models/teacher");
const constants = require("../utilities/constants");

class TeacherController {
  getList = async (req, res, next) => {
    try {
      const result = await User.viewUsers(1);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  put = async (req, res, next) => {
    console.log(req.body);
    try {
      const result = await Teacher.put(req.body);
      console.log(result);
      res.json("Update successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new TeacherController();
