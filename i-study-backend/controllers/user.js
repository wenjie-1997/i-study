const User = require("../models/user");
const jwt = require("jsonwebtoken");
const constants = require("../utilities/constants");

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
        user_id,
        name,
        user_type,
        ...(teacher_id && { teacher_id }),
        ...(student_id && { student_id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  viewUsers = async (req, res, next) => {
    try {
      const result = await User.viewUsers();
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  viewTeachers = async (req, res, next) => {
    try {
      const result = await User.viewUsers(1);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  viewStudents = async (req, res, next) => {
    try {
      const result = await User.viewUsers(2);
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
      res.json(result[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    const { user_id } = req.user;
    try {
      const result = await User.get(user_id);
      res.json(result);
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
}

module.exports = new UserController();
