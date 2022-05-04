const Class = require("../models/class");
const classDto = require("../dto/class");
const classSubjectDto = require("../dto/classSubject");
const userDto = require("../dto/user");
const classStudentDto = require("../dto/classStudent");

class ClassController {
  getClassList = async (req, res, next) => {
    try {
      const result = await Class.get(req.query);
      res.json(
        result.length > 1
          ? result.map((classModel) => classDto.classToDto(classModel))
          : classDto.classToDto(result)
      );
    } catch (error) {
      next(error);
    }
  };

  insertClass = async (req, res, next) => {
    try {
      const result = await Class.post(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  updateClass = async (req, res, next) => {
    try {
      if (req.body?.class_id === null) return res.status(400).send();
      const result = await Class.put(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  deleteClass = async (req, res, next) => {
    try {
      if (req.body?.class_id === null) return res.status(400).send();
      const result = await Class.delete(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getClassSubject = async (req, res, next) => {
    try {
      const result = await Class.getClassSubject(req.query);
      res.json(
        result.map((subject) => classSubjectDto.classSubjectToDto(subject))
      );
    } catch (error) {
      next(error);
    }
  };

  insertClassSubject = async (req, res, next) => {
    try {
      const result = await Class.insertClassSubject(req.body);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  deleteClassSubject = async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await Class.deleteClassSubject(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getClassStudent = async (req, res, next) => {
    try {
      const result = await Class.getClassStudent(req.query);
      res.json(
        result.map((student) => classStudentDto.classSubjectToDto(student))
      );
    } catch (error) {
      next(error);
    }
  };
  insertClassStudent = async (req, res, next) => {
    try {
      const result = await Class.insertClassStudent(req.body);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  deleteClassStudent = async (req, res, next) => {
    try {
      const result = await Class.deleteClassStudent(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  getClassTimetable = async (req, res, next) => {
    try {
      const result = await Class.getClassTimetable(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  updateClassTimetable = async (req, res, next) => {
    try {
      const { timetableSlots } = req.body;
      const existingTimeTable = await Class.getClassTimetable(req.query);
      //Insert new slot
      timetableSlots.forEach(async (slot) => {
        if (!slot?.timetable_slot_id) {
          //insert slots
          await Class.insertTimetableSlot(slot);
        } else {
          //find the slot from existingTimetable and pop it out
          existingTimeTable.splice(
            existingTimeTable.findIndex(
              (s) => s.timetable_slot_id === slot.timetable_slot_id
            ),
            1
          );
        }
      });
      //Remove old slots
      existingTimeTable.forEach(
        async (slot) =>
          await Class.deleteTimetableSlot({
            timetable_slot_id: slot.timetable_slot_id,
          })
      );
      res.send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ClassController();
