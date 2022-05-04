const db = require(`../db`);

class User {
  constructor() {
    if (this.instance) return this.instance;
    User.instance = this;
  }

  get = async (user_id) => {
    const row = await db.query("CALL get_user_info(?);", [user_id]);
    return this.rowToArray(row[0]);
  };

  async registerStudent({
    username,
    password,
    user_type,
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
  }) {
    let queryString = `
    CALL insert_new_student(?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const row = await db.query(queryString, [
      username,
      password,
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

  async registerTeacher({
    username,
    password,
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
  }) {
    let queryString = `
    CALL insert_new_teacher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const row = await db.query(queryString, [
      username,
      password,
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

  viewUsers = async (user_type = null) => {
    const row = await db.query("CALL select_user(?)", [user_type]);
    return this.rowToArray(row);
  };

  login = async ({ username, password }) => {
    const row = await db.query("CALL login(?,?)", [username, password]);
    return this.rowToArray(row);
  };

  delete = async ({ user_id }) => {
    const row = await db.query("CALL delete_user(?)", [user_id]);
    return row;
  };

  updatePassword = async ({ username, newPassword }) => {
    const row = await db.query("CALL update_password(?,?)", [
      username,
      newPassword,
    ]);
    return JSON.parse(JSON.stringify(row));
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new User();
