const User = require("../models/user");
const Teacher = require("../models/teacher");
const teacherDto = require("../dto/teacher");
const userDto = require("../dto/user");
const classDto = require("../dto/class");
const classSubjectDto = require("../dto/classSubject");
const timetableSlotDto = require("../dto/timetableSlot");
const subjectDto = require("../dto/subject");

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

  getTimetableByTeacherId = async (req, res, next) => {
    try {
      const result = await Teacher.getTimetableByTeacherId(req.query);
      console.log(result);
      res.json(
        result.map((slot) => ({
          ...timetableSlotDto.timetableSlotToDto(slot),
          ...subjectDto.subjectToDto(slot),
          ...classDto.classToDto(slot),
        }))
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getSubjectByTeacherId = async (req, res, next) => {
    try {
      const result = await Teacher.getSubjectByTeacherId(req.query);
      res.json(
        result.map((subject) => ({
          ...classSubjectDto.classSubjectToDto(subject),
          ...subjectDto.subjectToDto(subject),
        }))
      );
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
