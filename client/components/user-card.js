import React, {Component} from 'react';
import styles from './users.css';
import { connect } from 'react-redux';
import {changeAdmin, changeDisabled, changeGodPowers, setCohort} from '../store';
import Switch from 'react-switch';

class UserCard extends Component {
  state = {
    visible: false,
    cohortId: this.props.user.cohort ? this.props.user.cohort.id || ''
  }
  toggleVisibility = () => {
    this.setState({visible: !this.state.visible});
  }
  handleSelect = (id, cohortId) => {
    this.setState({cohortId});
    this.props.changeCohort(id, cohortId);
  }
  render() {
    const {user, cohorts, isGod, toggleAdmin, toggleDisabled, toggleGodPowers, changeCohort} = this.props;
    return (
      <section key={user.id} className={styles.container}>
        <h3 onClick={this.toggleVisibility} className={styles.email}>{user.email}</h3>
        { this.state.visible && (
          <section className={styles.toggle__container}>
          <article className={styles.toggle}>
            <span className={styles.label}>Admin:</span>
              <Switch
                checked={user.isAdmin}
                onChange={() => toggleAdmin(user.id)}
              />
          </article>
          { isGod &&
              <article className={styles.toggle}>
              <span className={styles.label}>Disabled:</span>
              <Switch
                checked={user.isDisabled}
                onChange={() => toggleDisabled(user.id)}
              />
              </article>
          } { isGod &&
              <article className={styles.toggle}>
              <span className={styles.label}>IsGod:</span>
              <Switch
                checked={user.isGod}
                onChange={() => toggleGodPowers(user.id)}
              />
              </article>
          }
            <article className={styles.toggle}>
              <span className={styles.label}>Cohort:</span>

            { isGod ? (
              <select className={styles.input} value={this.state.cohortId} onChange={(event) => this.handleSelect(user.id, event.target.value)}>
                <option value="">--</option>
                {cohorts.map((cohort) => <option key={cohort.id} value={cohort.id}>{cohort.name}</option>)}
              </select>
            ) : (
              <span className={styles.cohortName}>
                {user.cohort ? user.cohort.name : 'None'}
              </span>
            )}
            </article>
          </section>
        )}
      </section>
    );
  }
}

const mapState = ({user, cohorts}) => ({
  isGod: user.isGod,
  cohorts
});
const mapDispatch = (dispatch) => ({
  toggleAdmin(id) {
    dispatch(changeAdmin(id));
  },
  toggleDisabled(id) {
    dispatch(changeDisabled(id));
  },
  toggleGodPowers(id) {
    dispatch(changeGodPowers(id));
  },
  changeCohort(id, cohortId) {
    dispatch(setCohort(id, +cohortId));
  }
});

export default connect(mapState, mapDispatch)(UserCard);
