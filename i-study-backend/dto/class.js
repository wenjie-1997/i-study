module.exports = {
  classToDto: ({
    class_id,
    name,
    class_name,
    class_teacher_id,
    form,
    year,
    class_teacher_name,
  }) => ({
    ...(class_id && { classId: class_id }),
    ...(name && { name }),
    ...(class_teacher_id && { classTeacherId: class_teacher_id }),
    ...(class_teacher_name && { classTeacherName: class_teacher_name }),
    ...(form && { form }),
    ...(year && { year }),
    ...(class_name && { className: class_name }),
  }),
};
