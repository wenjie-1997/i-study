const db = require(`../db`);

class Subject {
  constructor() {
    if (this.instance) return this.instance;
    Subject.instance = this;
  }

  get = async ({ subjectId = null }) => {
    if (subjectId !== null) {
      const row = await db.query("CALL select_subject_by_id(?)", [subjectId]);
      return this.rowToArray(row);
    }
    const row = await db.query("CALL select_subject()");
    return this.rowToArray(row);
  };

  post = async ({ name, code }) => {
    const row = await db.query("CALL insert_subject(?,?)", [name, code]);
    return row;
  };

  put = async ({ subjectId, name, code }) => {
    const row = await db.query("CALL update_subject(?,?,?)", [
      subjectId,
      name,
      code,
    ]);
    return row;
  };

  delete = async ({ subjectId }) => {
    const row = await db.query("CALL delete_subject(?)", [subjectId]);
    return row;
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Subject();
