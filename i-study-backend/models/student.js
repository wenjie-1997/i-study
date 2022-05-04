const db = require(`../db`);

class Student {
  constructor() {
    if (this.instance) return this.instance;
    Student.instance = this;
  }

  put = async ({
    studentId,
    name = null,
    birthday = null,
    gender = null,
    race = null,
    religion = null,
    address = null,
    telNo = null,
    hpNo = null,
    email = null,
    disability = null,
    schoolId = null,
  }) => {
    {
      let queryString = `
        CALL update_student_info(?,?,?,?,?,?,?,?,?,?,?,?);
        `;
      return await db.query(queryString, [
        studentId,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        telNo,
        hpNo,
        email,
        disability,
        schoolId,
      ]);
    }
  };

  searchByName = async ({ searchText }) => {
    const row = await db.query("CALL search_student_by_name(?)", [searchText]);
    return this.rowToArray(row);
  };

  getTimetableByStudentId = async ({ studentId }) => {
    const row = await db.query("CALL select_class_timetable_by_student_id(?)", [
      studentId,
    ]);
    return this.rowToArray(row);
  };
  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Student();
