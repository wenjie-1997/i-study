const db = require(`../db`);

class Topic {
  constructor() {
    if (this.instance) return this.instance;
    Topic.instance = this;
  }

  get = async ({ classSubjectId = null }) => {
    const row = await db.query("CALL select_topic(?)", [classSubjectId]);
    return this.rowToArray(row);
  };

  post = async ({ name, arrangement, classSubjectId }) =>
    await db.query("CALL insert_topic(?,?,?)", [
      name,
      arrangement,
      classSubjectId,
    ]);

  put = async ({ name, arrangement, topicId }) =>
    await db.query("CALL update_topic(?,?,?)", [name, arrangement, topicId]);

  delete = async ({ topicId }) =>
    await db.query("CALL delete_topic(?)", [topicId]);

  getTopicComponent = async ({ topicId }) => {
    const row = await db.query("CALL select_topic_component(?)", [topicId]);
    return this.rowToArray(row);
  };
  insertRichText = async ({ content, topicId }) =>
    await db.query("CALL insert_rich_text(?,?)", [content, topicId]);

  updateRichText = async ({ content, richTextId }) =>
    await db.query("CALL update_rich_text(?,?)", [content, richTextId]);

  deleteRichText = async ({ richTextId }) => {
    await db.query("CALL delete_rich_text(?)", [richTextId]);
  };

  insertMaterial = async ({ url, fileName, topicId }) =>
    await db.query("CALL insert_material(?,?,?)", [url, fileName, topicId]);

  updateMaterial = async ({ url, fileName, materialId }) =>
    await db.query("CALL update_material(?,?,?)", [url, fileName, materialId]);

  deleteMaterial = async ({ materialId }) => {
    await db.query("CALL delete_material(?)", [materialId]);
  };

  insertForum = async ({ title, description, topicId }) =>
    await db.query("CALL insert_forum(?,?,?)", [title, description, topicId]);

  updateForum = async ({ title, description, forumId }) =>
    await db.query("CALL update_forum(?,?,?)", [title, description, forumId]);

  deleteForum = async ({ forumId }) => {
    await db.query("CALL delete_forum(?)", [forumId]);
  };

  insertSubmission = async ({ title, description, dueDate, topicId }) =>
    await db.query("CALL insert_submission(?,?,?,?)", [
      title,
      description,
      dueDate,
      topicId,
    ]);

  updateSubmission = async ({ title, description, dueDate, submissionId }) =>
    await db.query("CALL update_submission(?,?,?,?)", [
      title,
      description,
      dueDate,
      submissionId,
    ]);

  deleteSubmission = async ({ submissionId }) => {
    await db.query("CALL delete_submission(?)", [submissionId]);
  };

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Topic();
