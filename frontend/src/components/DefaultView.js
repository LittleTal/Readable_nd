import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import Categories from './Categories'
import PostList from './PostList'
import { updateCategory } from '../actions/categoriesActions'

class DefaultView extends Component {
  componentDidMount () {
    this.updateCategory(this.props)
  }

  componentWillUpdate (nextProps) {
    this.updateCategory(nextProps)
  }

  updateCategory (props) {
    const category = props.match.params.category
    if (category !== props.category) {
      props.updateCategory(category)
    }
  }

  render () {
    return (
      <div>
        <div>
          <Categories />
        </div>
        <div>
          <PostList />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    category: category.active
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)
