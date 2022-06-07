const User = require("../models/user");
const jwt = require("jsonwebtoken");
const constants = require("../utilities/constants");
const userDto = require("../dto/user");
const studentDto = require("../dto/student");
const teacherDto = require("../dto/teacher");
const classDto = require("../dto/class");

class UserController {
  registerStudent = async (req, res, next) => {
    try {
      await User.registerStudent(req.body);
      res.status(201).send("Registered successfully");
    } catch (error) {
      if (error.errno === 1062) {
        res.status(409).send("Duplicate Entry");
      }
      next(error);
    }
  };
  registerTeacher = async (req, res, next) => {
    try {
      await User.registerTeacher(req.body);
      res.status(201).send("Registered successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  verifyToken = async (req, res) => {
    try {
      const { user } = req;
      const { user_id, name, user_type, teacher_id, student_id } = user;
      const token = jwt.sign(
        { user_id, name, user_type },
        constants.TOKEN_KEY,
        {
          expiresIn: "20m",
        }
      );
      return res.json({
        jwt: token,
        ...userDto.userToDto({
          user_id,
          name,
          user_type,
          ...(teacher_id && { teacher_id }),
          ...(student_id && { student_id }),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  viewUsers = async (req, res, next) => {
    try {
      let result = await User.viewUsers(req.query);

      result = result.map((element) => {
        delete element.password;
        return {
          ...userDto.userToDto(element),
          ...studentDto.studentToDTO(element),
          ...teacherDto.teacherToDto(element),
        };
      });
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  viewTeachers = async (req, res, next) => {
    try {
      const result = await User.viewUsers({ userType: 1 });
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  viewStudents = async (req, res, next) => {
    try {
      const result = await User.viewUsers({ userType: 2 });
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      const result = await User.login(req.body);
      if (result.length === 0) return res.status(204).send();
      result[0].jwt = jwt.sign(result[0], constants.TOKEN_KEY, {
        expiresIn: "20m",
      });
      if (result[0].teacher_id === null) delete result[0].teacher_id;
      if (result[0].student_id === null) delete result[0].student_id;
      res.json({
        jwt: result[0].jwt,
        ...userDto.userToDto(result[0]),
        ...classDto.classToDto(result[0]),
        username: req.body.username,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    const { user_id } = req.user;
    try {
      const result = await User.get(user_id);
      res.json({
        ...userDto.userToDto(result),
        ...studentDto.studentToDTO(result),
        ...teacherDto.teacherToDto(result),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const result = await User.delete(req.body);
      res.send("Delete user successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { username, oldPassword, newPassword } = req.body;
      const loginResult = await User.login({ username, password: oldPassword });
      if (loginResult.length === 0) {
        return res.json({ isInvalid: 1, isUpdated: 0 });
      } else {
        const { affectedRows, serverStatus } = await User.updatePassword({
          username,
          newPassword,
        });
        if (affectedRows > 0 && serverStatus === 2)
          res.json({ isInvalid: 0, isUpdated: 1 });
        else res.json({ isInvalid: 0, isUpdated: 0 });
      }
    } catch (error) {
      console.log(error);
      return res.json({ isInvalid: 0, isUpdated: 0 });
    }
  };
}

module.exports = new UserController();
