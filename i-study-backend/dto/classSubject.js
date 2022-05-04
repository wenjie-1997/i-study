module.exports = {
  classSubjectToDto: ({
    class_subject_id,
    class_id,
    subject_id,
    teacher_id,
    class_name,
    subject_name,
    teacher_name,
  }) => ({
    ...(class_subject_id && { classSubjectId: class_subject_id }),
    ...(class_id && { classId: class_id }),
    ...(subject_id && { subjectId: subject_id }),
    ...(teacher_id && { teacherId: teacher_id }),
    ...(class_name && { className: class_name }),
    ...(subject_name && { subjectName: subject_name }),
    ...(teacher_name && { teacherName: teacher_name }),
  }),
};
