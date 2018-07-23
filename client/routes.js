import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, Navbar, Main, FeedbackForm, ViewTeam} from './components';
import {me, fetchCohorts} from './store';
import styles from './components/index.css';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;
    return (
      <div>
        <Route path="/" component={Navbar} />
        <main className={styles.container}>
          <section className={styles.card}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {isLoggedIn && (
              <Switch>
                <Route path ="/home" component={Main} />
                <Route path ="/feedback/add" component={FeedbackForm} />
                <Route path ="/feedback/view" component={ViewTeam} />
              </Switch>
            )}
            <Route component={Login} />
          </Switch>
          </section>
        </main>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchCohorts());
  },
});

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
