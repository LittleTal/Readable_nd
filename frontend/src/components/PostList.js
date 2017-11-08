import './PostList.css';
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import values from 'lodash/values';
import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TrashIcon from 'react-icons/lib/fa/trash';
import { fetchPosts, deletePost, updateSortBy, voteForPost } from '../actions/postsActions';
import CommentCount from './CommentCount';
import ItemSummary from './ItemSummary';
import SortBy from './SortBy';
import VoteScore from './VoteScore';

class PostList extends Component {
  componentDidMount () {
    this.props.fetchPosts(this.props.category)
  }

  componentWillUpdate ({ category }) {
    if (category !== this.props.category) {
      this.props.fetchPosts(category)
    }
  }

  render () {
    return (
      <div className='post-list'>

            <div className='post-data'>
              <div className='btn'>
                <Link to='/new'>Create New Post</Link>
              </div>
              <div>
                <SortBy
                  sortBy={this.props.sortBy}
                  onSortByChange={sortBy => this.props.updateSortBy(sortBy)}
                />
              </div>
            </div>

        <div>
          {this.props.posts.map(post => (
            <div className='post-item' key={post.id}>
              <div className='vote-score'>
                <VoteScore
                  voteScore={post.voteScore}
                  onVoteChange={option => this.props.voteForPost(post, option)}
                />
              </div>
              <div className='post-body' key={post.id}>
                  <div className='category-box'>
                    <Link className='category'
                      to={`/${post.category}`}
                    >
                      {post.category}
                    </Link>

                  </div>

                  <div>
                  <Link
                    className='post-title'
                    to={`/${post.category}/${post.id}`}
                  >
                    {post.title}
                  </Link>
                  </div>

                  <div>
                    <Link
                      className='post-summary'
                      to={`/${post.category}/${post.id}`}
                    >
                    </Link>
                  </div>

                  <div className='meta-data'>
                    <ItemSummary item={post} />
                  </div>
                  <CommentCount
                    count={this.props.commentCount[post.id]}
                  />

                  <div className='icons-container'>
                    <div>
                      <Link
                        className='button'
                        to={`/${post.category}/${post.id}/edit`}
                      >
                        <PencilIcon className='icon' />
                      </Link>
                    </div>

                    <div>
                      <button
                        className='button icon'
                        onClick={() => this.props.deletePost(post)}
                      >
                        <TrashIcon />
                      </button>
                    </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    )
  }
}

function mapStateToProps ({ category, posts, comments }) {
  const filteredPosts = category.active
    ? filter(posts.byId, { category: category.active })
    : values(posts.byId)

  return {
    category: category.active,
    posts: sortBy(filteredPosts, post => -post[posts.sortBy]),
    commentCount: countBy(comments.byId, 'parentId'),
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
    deletePost: post => dispatch(deletePost(post)),
    voteForPost: (post, option) => dispatch(voteForPost(post, option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
