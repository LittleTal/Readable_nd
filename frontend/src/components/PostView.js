
import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import PencilIcon from 'react-icons/lib/fa/pencil';
import CommentIcon from 'react-icons/lib/fa/comment-o';
import TrashIcon from 'react-icons/lib/fa/trash';
import './PostView.css';
import {fetchPost,voteForPost,deletePost,} from '../actions/postsActions';
import {createComment,updateComment,voteForComment,deleteComment,updateSortCommentsBy} from '../actions/commentsActions';
import CommentCount from './CommentCount';
import ItemSummary from './ItemSummary';
import SortBy from './SortBy';
import VoteScore from './VoteScore';

class PostView extends Component {
  state = {
    commentModalOpen: false,
    id: null,
    author: '',
    body: ''
  }

  componentDidMount () {
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id)
    }
  }

  deletePost = () => {
    this.props
      .deletePost(this.props.post)
      .then(() => this.props.history.replace('/'))
  }

  editComment = comment => {
    const { author, body, id } = comment
    this.setState({
      commentModalOpen: true,
      id,
      author,
      body
    })
    this.showCommentModal()
  }

  showCommentModal = () => {
    this.setState({ commentModalOpen: true })
  }

  closeCommentModal = () => {
    this.setState({
      commentModalOpen: false,
      id: null,
      author: '',
      body: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSaveComment = event => {
    event.preventDefault()

    const { author, body, id } = this.state
    const timestamp = Date.now()

    if (id) {
      this.props.updateComment(id, { body, timestamp })
    } else {
      const comment = {
        author,
        body,
        timestamp,
        id: Math.random().toString(36).substr(-8),
        parentId: this.props.post.id
      }

      this.props.createComment(comment)
    }

    this.closeCommentModal()
  }

  render () {
    const { post, comments } = this.props

    return (
      <div className='container'>
        {post &&
          <div className='media'>
            <div className='media-body'>
              <div>
                <Link to='/' className='back'>Go Back</Link>
            </div>
              <div>
                <div className='sub-headline'>
                  Post Overview
                </div>

                <button
                  className=''
                  onClick={() => this.showCommentModal()}
                >
                <div className='btn margin-top'>
                  Add Comment
                </div>
                </button>

                <div className='margin-top'>
                  <SortBy
                    sortBy={this.props.sortBy}
                    onSortByChange={sortBy =>
                      this.props.updateSortCommentsBy(sortBy)}
                  />
                </div>

            </div>



            <div className='post-item vote-score'>
              <VoteScore
                voteScore={post.voteScore}
                onVoteChange={option => this.props.voteForPost(post, option)}
              />
                <div>
                  <div>
                    <div className='post-body'>
                      <span className='category'>
                        {post.category}
                      </span>
                      <div>
                        <div className='post-title'>
                          {post.title}
                        </div>
                        <ItemSummary item={post} />
                      </div>
                      <div className='comment-data'>
                        <CommentCount
                          count={(comments || []).length}
                        />
                      </div>
                    </div>
                  </div>

                  <p className='post-body post-content'>{post.body}</p>
                  <div>
                    <div className='post-body'>
                      <Link to={`${post.id}/edit`} className='button'>
                        <PencilIcon />
                      </Link>
                      <button
                        className='button'
                        onClick={this.deletePost}
                      >
                        <TrashIcon/>
                      </button>
                    </div>
                  </div>
                  </div>

              </div>
              {comments.map(comment => (
                <div key={comment.id} className='comment-item'>
                  <VoteScore
                    voteScore={comment.voteScore}
                    onVoteChange={option =>
                      this.props.voteForComment(comment, option)}
                  />
                  <div className='post-body'>
                    <div>

                      <ItemSummary item={comment} />

                    </div>
                    <div className='post-content'>
                      <p>{comment.body}</p>
                    </div>

                    <div>
                      <button
                        className='button'
                        onClick={() => this.editComment(comment)}
                      >
                        <PencilIcon className='icon'/>

                      </button>
                      <button
                        className='button'
                        onClick={() => this.props.deleteComment(comment)}
                      >
                        <TrashIcon/>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>}

        <Modal
          className='modal-item'
          // overlayClassName='comment-item'
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
          <div>
            <form onSubmit={this.handleSaveComment}>
              <div className='modal-header'>
                {this.state.id ? 'Edit' : 'Add'} Comment
                <button
                  className='close'
                  onClick={event => {
                    event.preventDefault()
                    this.closeCommentModal()
                  }}
                >
                X
                </button>
              </div>
              <div className='post-list'>
                {!this.state.id &&
                  <div className='form-group'>
                    <input
                      id='comment-author'
                      name='author'
                      value={this.state.author}
                      onChange={this.handleChange}
                      type='text'
                      className='form-control'
                      placeholder='Name'
                    />
                  </div>}
                <div className='form-group'>
                  <textarea
                    id='comment-body'
                    name='body'
                    value={this.state.body}
                    onChange={this.handleChange}
                    rows='3'
                    className='form-control'
                    placeholder='Comment'
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='btn'>Save</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }, ownProps) {
  const activePost = posts.byId[ownProps.match.params.id]
  const filteredComments = filter(comments.byId, {
    parentId: activePost && activePost.id
  })

  return {
    post: activePost,
    comments: sortBy(filteredComments, comment => -comment[comments.sortBy]),
    sortBy: comments.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    voteForPost: (post, option) => dispatch(voteForPost(post, option)),
    deletePost: post => dispatch(deletePost(post)),
    createComment: comment => dispatch(createComment(comment)),
    updateComment: (id, details) => dispatch(updateComment(id, details)),
    voteForComment: (comment, option) =>
      dispatch(voteForComment(comment, option)),
    deleteComment: comment => dispatch(deleteComment(comment)),
    updateSortCommentsBy: sortBy => dispatch(updateSortCommentsBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
