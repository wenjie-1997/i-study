const User = require("../models/user");
const Teacher = require("../models/teacher");
const teacherDto = require("../dto/teacher");
const userDto = require("../dto/user");

class TeacherController {
  getList = async (req, res, next) => {
    try {
      const result = await User.viewUsers(1);
      result = result.map((element) => {
        delete element.password;
        return element;
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const result = await Teacher.put(req.body);
      res.json("Update successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  searchByName = async (req, res, next) => {
    try {
      const result = await Teacher.searchByName(req.query);
      res.json(
        result.map((teacher) => ({
          ...teacherDto.teacherToDto(teacher),
          ...userDto.userToDto(teacher),
        }))
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new TeacherController();
