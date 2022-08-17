const { notificationToDto } = require("../dto/notification");
const Class = require("../models/class");
const Notification = require("../models/notification");

class NotificationController {
  insertNotification = async (topicComponent) => {
    try {
      if (topicComponent === null) return;
      const studentList = await Class.getClassStudent({
        classId: topicComponent.classId,
      });
      studentList.forEach(async (student) => {
        await Notification.post({
          studentId: student.student_id,
          topicComponentId: topicComponent.topicComponentId,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  get = async (req, res, next) => {
    try {
      const result = await Notification.get(req.query);
      res.json(result.map((noti) => notificationToDto(noti)));
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  put = async (req, res, next) => {
    try {
      const notificationIdList = req.body;
      notificationIdList.forEach(
        async (notificationId) => await Notification.put({ notificationId })
      );
      res.send();
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new NotificationController();
