const User = require("../models/user");
const Student = require("../models/student");
const userDto = require("../dto/user");
const studentDto = require("../dto/student");
const subjectDto = require("../dto/subject");
const timetableSlotDto = require("../dto/timetableSlot");
const classSubjectDto = require("../dto/classSubject");

class StudentController {
  getList = async (req, res, next) => {
    try {
      const result = await User.viewUsers(2);
      result = result.map((element) => {
        delete element.password;
        return {
          ...userDto.userToDto(element),
          ...studentDto.studentToDTO(element),
        };
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const result = await Student.put(req.body);
      res.json("Update successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  searchByName = async (req, res, next) => {
    try {
      const result = await Student.searchByName(req.query);
      res.json(
        result.map((stu) => ({
          ...userDto.userToDto(stu),
          ...studentDto.studentToDTO(stu),
        }))
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getTimetableByStudentId = async (req, res, next) => {
    try {
      const result = await Student.getTimetableByStudentId(req.query);
      res.json(
        result.map((slot) => ({
          ...timetableSlotDto.timetableSlotToDto(slot),
          ...subjectDto.subjectToDto(slot),
        }))
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getSubjectByStudentId = async (req, res, next) => {
    try {
      const result = await Student.getSubjectByStudentId(req.query);
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
}

module.exports = new StudentController();
