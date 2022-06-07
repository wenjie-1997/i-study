const Class = require("../models/class");
const classDto = require("../dto/class");
const subjectDto = require("../dto/subject");
const classSubjectDto = require("../dto/classSubject");
const timetableSlotDto = require("../dto/timetableSlot");
const userDto = require("../dto/user");
const classStudentDto = require("../dto/classStudent");

class ClassController {
  getClassList = async (req, res, next) => {
    try {
      const result = await Class.get(req.query);
      console.log(result);
      res.json(
        result.length > 0
          ? result.map((classModel) => classDto.classToDto(classModel))
          : classDto.classToDto(result)
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  insertClass = async (req, res, next) => {
    try {
      const result = await Class.post(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateClass = async (req, res, next) => {
    try {
      if (req.body?.class_id === null) return res.status(400).send();
      const result = await Class.put(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteClass = async (req, res, next) => {
    try {
      if (req.body?.class_id === null) return res.status(400).send();
      const result = await Class.delete(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      next(error);
    }
  };

  insertClassSubject = async (req, res, next) => {
    try {
      const result = await Class.insertClassSubject(req.body);
      res.status(201).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteClassSubject = async (req, res, next) => {
    try {
      const result = await Class.deleteClassSubject(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      next(error);
    }
  };
  insertClassStudent = async (req, res, next) => {
    try {
      const result = await Class.insertClassStudent(req.body);
      res.status(201).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  deleteClassStudent = async (req, res, next) => {
    try {
      const result = await Class.deleteClassStudent(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  getClassTimetable = async (req, res, next) => {
    try {
      const result = await Class.getClassTimetable(req.query);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateClassTimetable = async (req, res, next) => {
    let unavailableSlotList = [];
    let crashedSlotList = [];
    try {
      const { timetableSlots } = req.body;
      const existingTimeTable = await Class.getClassTimetable(req.query);

      //Insert new slot
      for (let i = 0; i < timetableSlots.length; i++) {
        const slot = timetableSlots[i];
        if (!slot?.timetable_slot_id) {
          let isAvailable = true;
          //check whether that teacher is available on that slot
          for (
            let j = slot.starting_slot;
            j < slot.starting_slot + slot.no_of_slots;
            j++
          ) {
            const unavailableTimetableslot =
              await Class.getOccupiedTimetableSlotByClassSubjectId({
                classSubjectId: slot.class_subject_id,
                day: slot.day,
                slotNo: j,
              });
            if (unavailableTimetableslot.length > 0) {
              isAvailable = false;
              unavailableSlotList.push(Object.assign({}, slot));
              crashedSlotList.push(
                Object.assign({}, unavailableTimetableslot[0])
              );
              break;
            }
          }
          //insert slots
          if (isAvailable) {
            await Class.insertTimetableSlot(slot);
          }
        } else {
          //find the slot from existingTimetable and pop it out
          existingTimeTable.splice(
            existingTimeTable.findIndex(
              (s) => s.timetable_slot_id === slot.timetable_slot_id
            ),
            1
          );
        }
      }
      console.log({ unavailableSlotList, crashedSlotList });
      //Remove old slots
      existingTimeTable.forEach(
        async (slot) =>
          await Class.deleteTimetableSlot({
            timetable_slot_id: slot.timetable_slot_id,
          })
      );
      res.json(
        unavailableSlotList.length > 0 && {
          unavailableSlotList: [
            ...unavailableSlotList.map((slot) => ({
              ...timetableSlotDto.timetableSlotToDto(slot),
              ...subjectDto.subjectToDto(slot),
            })),
          ],
          crashedSlotList: [
            ...crashedSlotList.map((slot) => ({
              ...timetableSlotDto.timetableSlotToDto(slot),
              ...subjectDto.subjectToDto(slot),
              ...classDto.classToDto(slot),
            })),
          ],
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new ClassController();
