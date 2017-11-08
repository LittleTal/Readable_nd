import API from '../utils/api';
export const GET_COMMENTS = 'GET_COMMENTS';
export const COMMENT_CREATED = 'COMMENT_CREATED';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const COMMENT_DELETED = 'COMMENT_DELETED';
export const UPDATE_SORT_COMMENTS_BY = 'UPDATE_SORT_COMMENTS_BY';

export const receiveComments = (postId, comments) => ({
  type: GET_COMMENTS,
  postId,
  comments
})

export const fetchComments = postId => dispatch => {
  return API.fetchComments(postId).then(comments => {
    dispatch(receiveComments(postId, comments))
  })
}

export const commentCreated = comment => ({
  type: COMMENT_CREATED,
  comment
})

export const createComment = comment => dispatch => {
  return API.createComment(comment).then(createdComment => {
    dispatch(commentCreated(createdComment))
  })
}

export const commentUpdated = comment => ({
  type: COMMENT_UPDATED,
  comment
})

export const updateComment = (id, details) => dispatch => {
  return API.updateComment(id, details).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const commentDeleted = comment => ({
  type: COMMENT_DELETED,
  comment
})

export const deleteComment = comment => dispatch => {
  return API.deleteComment(comment.id).then(() => {
    dispatch(commentDeleted(comment))
  })
}

export const voteForComment = (comment, option) => dispatch => {
  return API.voteForComment(comment, option).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const updateSortCommentsBy = sortBy => ({
  type: UPDATE_SORT_COMMENTS_BY,
  sortBy
})
