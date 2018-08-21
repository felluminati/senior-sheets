import React, {Component} from 'react';
import styles from './users.css';
import { connect } from 'react-redux';
import {changeAdmin, changeDisabled} from '../store';
import Switch from 'react-switch';

class UserCard extends Component {
  state = {
    visible: false
  }
  toggleVisibility = () => {
    this.setState({visible: !this.state.visible});
  }
  render() {
    const {user, isGod, toggleAdmin, toggleDisabled} = this.props;
    return (
      <section key={user.id} className={styles.container}>
      <article className={styles.email}>
      <h3 onClick={this.toggleVisibility}>{user.email}</h3>
      </article>
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
        }       { isGod &&
              <article className={styles.toggle}>
              <span className={styles.label}>IsGod:</span>
              <Switch
                checked={user.isDisabled}
                onChange={() => toggleDisabled(user.id)}
              />
              </article>
          }
          {
            isGod ? (
              <article className={styles.toggle}>
                <span className={styles.label}>Cohort:</span>
              <select className={styles.input}>
                <option>1</option>
                <option>2</option>
              </select>
              </article>
            ) : <span>{user.cohort}</span>
          }
          </section>
        )}
      </section>
    );
  }
}

const mapState = ({user}) => ({
  isGod: user.isGod
});
const mapDispatch = (dispatch) => ({
  toggleAdmin(id) {
    dispatch(changeAdmin(id));
  },
  toggleDisabled(id) {
    dispatch(changeDisabled(id));
  }
});

export default connect(mapState, mapDispatch)(UserCard);
