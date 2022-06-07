module.exports = {
  topicToDto: ({
    topic_id,
    name,
    class_subject_id,
    arrangement,
    topicComponentList,
  }) => ({
    ...(topic_id && { topicId: topic_id }),
    ...(name && { name }),
    ...(arrangement && { arrangement }),
    ...(class_subject_id && { classSubjectid: class_subject_id }),
    ...(topicComponentList && { topicComponentList }),
  }),
};
