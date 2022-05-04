module.exports = {
  classSubjectToDto: ({
    class_student_id,
    class_id,
    student_id,
    student_name,
  }) => ({
    ...(class_student_id && { classStudentId: class_student_id }),
    ...(class_id && { classId: class_id }),
    ...(student_id && { studentId: student_id }),
    ...(student_name && { studentName: student_name }),
  }),
};
