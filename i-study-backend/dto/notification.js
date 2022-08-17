const topicDto = require("../dto/topic");
const studentDto = require("../dto/student");
const classDto = require("../dto/class");
const subjectDto = require("../dto/subject");
const topicComponentDto = require("../dto/topicComponent");

module.exports = {
  notificationToDto: (model) => ({
    ...(model?.notification_id && { notificationId: model?.notification_id }),
    ...(model?.created_date && { createdDate: model?.created_date }),
    ...(model?.is_opened !== null && { isOpened: model?.is_opened }),
    ...topicDto.topicToDto(model),
    ...studentDto.studentToDTO(model),
    ...subjectDto.subjectToDto(model),
    ...classDto.classToDto(model),
    ...topicComponentDto.topicComponentToDto(model),
  }),
};
