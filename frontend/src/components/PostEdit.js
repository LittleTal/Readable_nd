import './PostEdit.css';
import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost, fetchPost, updatePost } from '../actions/postsActions';

class PostEdit extends Component {
  state = {
    author: '',
    title: '',
    body: '',
    category: ''
  }

  componentDidMount () {
    const post = this.props.post
    if (post) {
      this.updateStateFromPost(post)
    } else {
      this.setInitialCategory(this.props.categories)
      if (this.props.match.params.id) {
        this.props.fetchPost(this.props.match.params.id)
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.post) {
      this.updateStateFromPost(nextProps.post)
    } else {
      this.setInitialCategory(nextProps.categories)
    }
  }

  updateStateFromPost ({ title, body }) {
    this.setState({ title, body })
  }

  setInitialCategory (categories) {
    if (categories.length && !this.state.category) {
      this.setState({ category: categories[0].path })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { author, title, body } = this.state
    let category = this.state.category
    let id
    let postSaved

    if (this.props.post) {
      id = this.props.post.id
      category = this.props.post.category
      postSaved = this.props.updatePost(id, { title, body })
    } else {
      id = Math.random().toString(36).substr(-8)
      postSaved = this.props.createPost({
        id,
        timestamp: Date.now(),
        author,
        title,
        body,
        category
      })
    }

    postSaved.then(() => this.props.history.push(`/${category}/${id}`))
  }

  handleCancel = event => {
    event.preventDefault()
    this.props.history.goBack()
  }

  render () {
    return (
      <div className='container '>
        <form onSubmit={this.handleSubmit}>
          {!this.props.post &&
            <div className="form-group">
              <div className='label'>
                <label htmlFor='post-author'>
                  Name
                </label>
              </div>
              <div>
                <input
                  id='post-author'
                  name='author'
                  value={this.state.author}
                  onChange={this.handleChange}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>}
          <div className='form-group label'>
            <div className='label'>
              <label className='label' htmlFor='post-title'>
                Title
              </label>
            </div>
            <div>
              <input
                id='post-title'
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
                type='text'
                className='form-control'
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='label'>
              <label className='label' htmlFor='post-body'>
                Content
              </label>
            </div>
            <div className='col-10'>
              <textarea
                id='post-body'
                name='body'
                value={this.state.body}
                onChange={this.handleChange}
                rows='3'
                className='form-control'
              />
            </div>
          </div>
          {!this.props.post &&
            <div className='form-group'>
              <div className='label'>
                <label className='label' htmlFor='post-category'>
                  Category
                </label>
              </div>
              <div>
                <select
                  id='post-category'
                  name='category'
                  value={this.state.category}
                  onChange={this.handleChange}
                  className='form-control'
                >
                  {this.props.categories.map(category => (
                    <option key={category.path} value={category.path}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>}
          <div>
            <div class='post-item'>
              <button className='btn' type='submit'>
                Save
              </button>
              <button className='btn' onClick={this.handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ category, posts }, ownProps) {
  const categories = category.list
  return {
    categories,
    post: posts.byId[ownProps.match.params.id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: post => dispatch(createPost(post)),
    fetchPost: id => dispatch(fetchPost(id)),
    updatePost: (id, details) => dispatch(updatePost(id, details))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostEdit)
)
