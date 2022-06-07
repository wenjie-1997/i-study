const db = require(`../db`);

class Class {
  constructor() {
    if (this.instance) return this.instance;
    Class.instance = this;
  }

  get = async ({ classId = null }) => {
    if (classId) {
      const row = await db.query("CALL select_class_by_id(?)", [classId]);
      return this.rowToArray(row[0]);
    }
    const row = await db.query("CALL select_class()");
    return this.rowToArray(row);
  };

  post = async ({ name, teacherId = null, form, year }) =>
    await db.query("CALL insert_new_class(?,?,?,?)", [
      name,
      teacherId,
      form,
      year,
    ]);

  put = async ({
    classId,
    name = null,
    teacherId = null,
    form = null,
    year = null,
  }) =>
    await db.query("CALL update_class(?,?,?,?,?)", [
      classId,
      name,
      teacherId,
      form,
      year,
    ]);

  delete = async ({ classId }) =>
    await db.query("CALL delete_class(?)", [classId]);

  getClassSubject = async ({ classId }) => {
    const row = await db.query("CALL select_class_subject(?)", [classId]);
    return this.rowToArray(row);
  };

  insertClassSubject = async ({ classId, subjectId, teacherId }) =>
    await db.query("CALL insert_class_subject(?,?,?)", [
      classId,
      subjectId,
      teacherId,
    ]);

  deleteClassSubject = async ({ classSubjectId }) =>
    await db.query("CALL delete_class_subject(?)", [classSubjectId]);

  getClassStudent = async ({ classId }) => {
    const row = await db.query("CALL select_class_student(?)", [classId]);
    return this.rowToArray(row);
  };

  insertClassStudent = async ({ classId, studentId }) =>
    await db.query("CALL insert_class_student(?,?)", [classId, studentId]);

  deleteClassStudent = async ({ classStudentId }) =>
    await db.query("CALL delete_class_student(?)", [classStudentId]);

  getClassTimetable = async ({ class_id }) => {
    const row = await db.query("CALL select_class_timetable(?)", [class_id]);
    return this.rowToArray(row);
  };

  getOccupiedTimetableSlotByClassSubjectId = async ({
    classSubjectId,
    day,
    slotNo,
  }) => {
    const row = await db.query(
      "CALL select_occupied_timetable_slots_with_class_subject_id(?,?,?)",
      [classSubjectId, day, slotNo]
    );
    return this.rowToArray(row);
  };

  insertTimetableSlot = async ({
    class_subject_id,
    day,
    starting_slot,
    no_of_slots,
  }) =>
    await db.query("CALL insert_timetable_slot(?,?,?,?)", [
      class_subject_id,
      day,
      starting_slot,
      no_of_slots,
    ]);

  deleteTimetableSlot = async ({ timetable_slot_id }) =>
    await db.query("CALL delete_timetable_slot(?)", [timetable_slot_id]);

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Class();
