import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './PostList.css';

class Categories extends Component {
  render () {
    return (
      <div>
        <ul className='nav'>
          {this.props.categories.map(category => {
            return (
              <li className='nav-item' key={category.name}>
                <NavLink
                  to={`/${category.path}`}
                  activeClassName='text-white'
                  isActive={() => category.path === this.props.active}
                  className='category-item'
                >
                {category.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    categories: category.list,
    active: category.active
  }
}

export default connect(mapStateToProps)(Categories)
