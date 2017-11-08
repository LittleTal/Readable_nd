const BASE_URL = 'http://localhost:3001'
const POSTS_URL = `${BASE_URL}/posts`
const COMMENTS_URL = `${BASE_URL}/comments`

const OPTIONS = {
  headers: {
    Authorization: 'whatever-you-want'
  }
}
const POST_OPTIONS = {
  ...OPTIONS,
  headers: {
    ...OPTIONS.headers,
    'Content-Type': 'application/json'
  },
  method: 'POST'
}
const PUT_OPTIONS = {
  ...OPTIONS,
  headers: {
    ...OPTIONS.headers,
    'Content-Type': 'application/json'
  },
  method: 'PUT'
}
const DELETE_OPTIONS = {
  ...OPTIONS,
  method: 'DELETE'
}

// ===== Categories ===== //

export function fetchCategories () {
  return fetch(`${BASE_URL}/categories`, OPTIONS)
    .then(res => res.json())
    .then(data => data.categories)
}

// ===== Posts ===== //

export function fetchPosts (category) {
  const url = category ? `${BASE_URL}/${category}/posts` : POSTS_URL
  return fetch(url, OPTIONS).then(res => res.json())
}

export function fetchPost (id) {
  return fetch(`${POSTS_URL}/${id}`, OPTIONS).then(res => res.json())
}

export function createPost (post) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify(post)
  }
  return fetch(POSTS_URL, options).then(res => res.json())
}

export function updatePost (id, details) {
  const options = {
    ...PUT_OPTIONS,
    body: JSON.stringify(details)
  }
  return fetch(`${POSTS_URL}/${id}`, options).then(res => res.json())
}

export function voteForPost (post, option) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify({ option })
  }
  return fetch(`${POSTS_URL}/${post.id}`, options).then(res => res.json())
}

export function deletePost (id) {
  return fetch(`${POSTS_URL}/${id}`, DELETE_OPTIONS)
}

// ===== Comments ===== //

export function fetchComments (postId) {
  return fetch(`${POSTS_URL}/${postId}/comments`, OPTIONS).then(res => {
    return res.json()
  })
}

export function createComment (comment) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify(comment)
  }
  return fetch(COMMENTS_URL, options).then(res => res.json())
}

export function updateComment (id, details) {
  const options = {
    ...PUT_OPTIONS,
    body: JSON.stringify(details)
  }
  return fetch(`${COMMENTS_URL}/${id}`, options).then(res => res.json())
}

export function deleteComment (id) {
  return fetch(`${COMMENTS_URL}/${id}`, DELETE_OPTIONS)
}

export function voteForComment (comment, option) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify({ option })
  }
  return fetch(`${COMMENTS_URL}/${comment.id}`, options).then(res => res.json())
}

export default {
  fetchCategories,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  voteForPost,
  deletePost,
  fetchComments,
  createComment,
  updateComment,
  voteForComment,
  deleteComment
}
