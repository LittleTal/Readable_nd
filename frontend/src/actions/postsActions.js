import API from '../utils/api';
import { fetchComments } from '../actions/commentsActions';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const POST_CREATED = 'POST_CREATED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = category => dispatch => {
  return API.fetchPosts(category).then((posts = []) => {
    posts.forEach(post => dispatch(fetchComments(post.id)))
    dispatch(receivePosts(posts))
  })
}

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = id => dispatch => {
  return API.fetchPost(id).then(post => {
    dispatch(fetchComments(post.id))
    dispatch(receivePost(post))
  })
}

export const postCreated = post => ({
  type: POST_CREATED,
  post
})

export const createPost = post => dispatch => {
  return API.createPost(post).then(createdPost => {
    dispatch(postCreated(createdPost))
  })
}

export const postUpdated = post => ({
  type: POST_UPDATED,
  post
})

export const updatePost = (id, details) => dispatch => {
  return API.updatePost(id, details).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const postDeleted = post => ({
  type: POST_DELETED,
  post
})

export const deletePost = post => dispatch => {
  return API.deletePost(post.id).then(() => {
    dispatch(postDeleted(post))
  })
}

export const voteForPost = (post, option) => dispatch => {
  return API.voteForPost(post, option).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})
