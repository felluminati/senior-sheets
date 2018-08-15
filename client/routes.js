import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, Navbar, Main, AddFeedbackForm, EditFeedbackForm, ViewTeam, Users} from './components';
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
                <Route path="/:cohortId/:projectName/:teamId/view" component={ViewTeam} />
                <Route path="/feedback/:cohort/:project/:teamId/add" component={AddFeedbackForm} />
                <Route path="/feedback/:cohort/:project/:teamId/edit" component={EditFeedbackForm} />
                <Route path="/feedback/:cohort/:project/:teamId/view" component={ViewTeam} />
                <Route path="/users" component={Users} />
                <Route render={() => <Redirect to="/home" />} />
              </Switch>
            )}
            {isLoggedIn && !isAdmin && (
              <div>
                <Title>Forbidden.</Title>
                <Title>Get outta here and ask your favorite staff member for access!</Title>
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
  isAdmin: !!state.user.isAdmin && !state.user.isDisabled
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchCohorts());
  }
});

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
