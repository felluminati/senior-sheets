import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers, changeAdmin, changeDisabled} from '../store';
import Switch from 'react-switch';
import styles from './users.css';

class Users extends Component {
  componentDidMount() {
   this.props.getUsers();
  }
  render() {
    const {users, toggleAdmin, toggleDisabled} = this.props;
    return (
      <section >
        {!!users.length && users.map((user) => (
          <section key={user.id} className={styles.container}>
            <article className={styles.article}>
            <h3>{user.email}</h3>
            </article>
            <article className={styles.toggle}>
              <p>Admin:</p>
                <Switch
                  checked={user.isAdmin}
                  onChange={() => toggleAdmin(user.id)}
                />
            </article>
                <article className={styles.toggle}>
              <p>Disabled:</p>
                <Switch
                  disabled={!this.props.user.isGod}
                  checked={user.isDisabled}
                  onChange={() => toggleDisabled(user.id)}
                />
                </article>
          </section>
        ))}
        <br />
        <h3>THIS IS A WORK IN PROGRESS OK! :D :D :D</h3>
      </section>
    );
  }
}

const mapState = ({users, user}) => ({
  users,
  user
});
const mapDispatch = (dispatch) => ({
  getUsers() {
    dispatch(fetchUsers());
  },
  toggleAdmin(id) {
    dispatch(changeAdmin(id));
  },
  toggleDisabled(id) {
    dispatch(changeDisabled(id));
  }
});

export default connect(mapState, mapDispatch)(Users);
