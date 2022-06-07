module.exports = {
  submissionToDto: ({
    student_submission_id,
    file_name,
    submission_date,
    url,
    submission_id,
    student_id,
  }) => ({
    ...(student_submission_id && {
      studentSubmissionId: student_submission_id,
    }),
    ...(student_id && {
      studentId: student_id,
    }),
    ...(submission_id && {
      submissionId: submission_id,
    }),
    ...(file_name && { fileName: file_name }),
    ...(url && { url }),
    ...(submission_date && { submissionDate: submission_date }),
  }),
};
