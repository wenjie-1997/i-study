module.exports = {
  subjectToDto: ({
    subject_id,
    name,
    code,
    subject_name,
    subject_code,
    teacher_name,
    class_name,
  }) => ({
    ...(subject_id && { subjectId: subject_id }),
    ...(name && { name }),
    ...(code && { code }),
    ...(subject_name && { subjectName: subject_name }),
    ...(subject_code && { subjectCode: subject_code }),
    ...(teacher_name && { teacherName: teacher_name }),
    ...(class_name && { className: class_name }),
  }),
};
