const db = require(`../db`);
class Forum {
  constructor() {
    if (this.instance) return this.instance;
    Forum.instance = this;
  }

  get = async ({ forumId }) => {
    const row = await db.query("CALL select_forum_comment(?)", [forumId]);
    return this.rowToArray(row);
  };

  post = async ({ comment, addedDateTime, forumId, userId }) =>
    await db.query("CALL insert_forum_comment(?,?,?,?)", [
      comment,
      addedDateTime,
      forumId,
      userId,
    ]);

  put = async ({ comment, addedDateTime, forumCommentId }) =>
    await db.query("CALL update_forum_comment(?,?,?)", [
      comment,
      addedDateTime,
      forumCommentId,
    ]);

  delete = async ({ forumCommentId }) =>
    await db.query("CALL delete_forum_comment(?)", [forumCommentId]);

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Forum();
