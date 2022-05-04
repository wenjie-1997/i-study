module.exports = {
  studentToDTO: ({ student_id, school_id, disability }) => ({
    ...(student_id && { studentId: student_id }),
    ...(school_id && { schoolId: school_id }),
    ...(disability && { disability }),
  }),
};
