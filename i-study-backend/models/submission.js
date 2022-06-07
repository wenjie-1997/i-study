const db = require(`../db`);

class Submission {
  constructor() {
    if (this.instance) return this.instance;
    Submission.instance = this;
  }

  get = async ({ studentId, submissionId }) => {
    const row = await db.query("CALL select_student_submission(?,?)", [
      studentId,
      submissionId,
    ]);
    return this.rowToArray(row);
  };

  getList = async ({ submissionId }) => {
    const row = await db.query(
      "CALL select_student_submission_by_submission_id(?)",
      [submissionId]
    );
    return this.rowToArray(row);
  };

  post = async ({ url, fileName, submissionDate, studentId, submissionId }) =>
    await db.query("CALL insert_student_submission(?,?,?,?,?)", [
      url,
      fileName,
      submissionDate,
      studentId,
      submissionId,
    ]);

  put = async ({ url, fileName, submissionDate, studentSubmissionId }) =>
    await db.query("CALL update_student_submission(?,?,?,?)", [
      url,
      fileName,
      submissionDate,
      studentSubmissionId,
    ]);

  delete = async ({ studentSubmissionId }) =>
    await db.query("CALL delete_student_submission(?)", [studentSubmissionId]);

  selectUnfinishedHomework = async ({ studentId }) => {
    const row = await db.query("CALL 	select_unfinished_homework(?)", [
      studentId,
    ]);
    return this.rowToArray(row);
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Submission();
