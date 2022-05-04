const db = require(`../db`);

class Teacher {
  constructor() {
    if (this.instance) return this.instance;
    Teacher.instance = this;
  }

  put = async ({
    teacherId,
    name = null,
    birthday = null,
    gender = null,
    race = null,
    religion = null,
    address = null,
    telNo = null,
    hpNo = null,
    email = null,
    workSince = null,
    officeNo = null,
    education = null,
    grade = null,
  }) => {
    {
      let queryString = `
        CALL update_teacher_info(?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;
      return await db.query(queryString, [
        teacherId,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        telNo,
        hpNo,
        email,
        workSince,
        officeNo,
        education,
        grade,
      ]);
    }
  };

  searchByName = async ({ searchText }) => {
    const row = await db.query("CALL search_teacher_by_name(?)", [searchText]);
    return this.rowToArray(row);
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Teacher();
