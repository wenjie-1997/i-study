const db = require(`../db`);

class Student {
  constructor() {
    if (this.instance) return this.instance;
    Student.instance = this;
  }

  put = async ({
    student_id,
    name = null,
    birthday = null,
    gender = null,
    race = null,
    religion = null,
    address = null,
    tel_no = null,
    hp_no = null,
    email = null,
    disability = null,
    school_id = null,
  }) => {
    {
      let queryString = `
        CALL update_student_info(?,?,?,?,?,?,?,?,?,?,?,?);
        `;
      return await db.query(queryString, [
        student_id,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        disability,
        school_id,
      ]);
    }
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Student();
