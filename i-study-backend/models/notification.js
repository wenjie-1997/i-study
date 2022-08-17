const db = require(`../db`);
class Notification {
  constructor() {
    if (this.instance) return this.instance;
    Notification.instance = this;
  }

  get = async ({ studentId }) => {
    const rows = await db.query("CALL select_notification(?)", [studentId]);
    return this.rowToArray(rows);
  };

  post = async ({ studentId, topicComponentId }) =>
    await db.query("CALL insert_notification(?,?)", [
      studentId,
      topicComponentId,
    ]);

  put = async ({ notificationId }) =>
    await db.query("CALL update_notification_is_opened(?)", [notificationId]);

  delete = async ({ notificationId }) =>
    await db.query("CALL delete_notification(?)", [notificationId]);

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows[0]));
  }
}

module.exports = new Notification();
