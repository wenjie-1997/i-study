module.exports = {
  forumToDTO: ({
    forum_id,
    comment,
    added_date_time,
    forum_comment_id,
    user_id,
    name,
  }) => ({
    ...(forum_id && { forumId: forum_id }),
    ...(name && { name }),
    ...(comment && { comment }),
    ...(added_date_time && { addedDateTime: added_date_time }),
    ...(forum_comment_id && { forumCommentId: forum_comment_id }),
    ...(user_id && { userId: user_id }),
  }),
};
