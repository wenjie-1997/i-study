module.exports = {
  teacherToDto: ({ teacher_id, work_since, office_no, education, grade }) => ({
    ...(teacher_id && { teacherId: teacher_id }),
    ...(work_since && { workSince: work_since }),
    ...(office_no && { officeNo: office_no }),
    ...(education && { education }),
    ...(grade && { grade }),
  }),
};
