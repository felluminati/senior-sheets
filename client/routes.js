import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, Navbar, Main, AddFeedbackForm, EditFeedbackForm, ViewTeam} from './components';
import {Title} from './components/elements';
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
    const {isLoggedIn, isAdmin} = this.props;
    return (
      <div>
        <Route path="/" component={Navbar} />
        <main className={styles.container}>
          <section className={styles.card}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {isLoggedIn && isAdmin && (
              <Switch>
                <Route path="/home" component={Main} />
                <Route path="/feedback/add" component={AddFeedbackForm} />
                <Route path="/feedback/edit/:feedbackId" component={EditFeedbackForm} />
                <Route path="/feedback/view" component={ViewTeam} />
                <Route render={() => <Redirect to="/home" />} />
              </Switch>
            )}
            {isLoggedIn && !isAdmin && (
              <div>
                <Title>Forbidden.</Title>
                <Title>Go away or ask your favorite staff member for access!</Title>
              </div>
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
  isLoggedIn: !!state.user.id,
  isAdmin: !!state.user.isAdmin
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
