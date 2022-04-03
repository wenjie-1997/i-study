const db = require(`../db`);

class Teacher {
  constructor() {
    if (this.instance) return this.instance;
    Teacher.instance = this;
  }

  put = async ({
    teacher_id,
    name = null,
    birthday = null,
    gender = null,
    race = null,
    religion = null,
    address = null,
    tel_no = null,
    hp_no = null,
    email = null,
    work_since = null,
    office_no = null,
    education = null,
    grade = null,
  }) => {
    {
      let queryString = `
        CALL update_teacher_info(?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;
      return await db.query(queryString, [
        teacher_id,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        work_since,
        office_no,
        education,
        grade,
      ]);
    }
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Teacher();
