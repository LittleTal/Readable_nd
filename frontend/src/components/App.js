import { Component, default as React } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './PostList.css';
import { fetchCategories } from '../actions/categoriesActions';
import DefaultView from './DefaultView';
import PostEdit from './PostEdit';
import PostView from './PostView';

class App extends Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    return (
      <div className='navbar'>
        <nav>
          <div className='header-container'>
          <Link to='/' className='header-title'>Readable</Link>
        </div>
        </nav>
        <Switch>
          <Route exact path='/' component={DefaultView} />
          <Route exact path='/new' component={PostEdit} />
          <Route exact path='/:category' component={DefaultView} />
          <Route exact path='/:category/:id' component={PostView} />
          <Route exact path='/:category/:id/edit' component={PostEdit} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
