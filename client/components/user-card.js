import React from 'react';
import styles from './users.css';
import { connect } from 'react-redux';
import {changeAdmin, changeDisabled} from '../store';
import Switch from 'react-switch';

const UserCard = (props) => {
  const {user, isGod, toggleAdmin, toggleDisabled} = props;
  return (
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
      { isGod &&
        <article className={styles.toggle}>
        <p>Disabled:</p>
        <Switch
          checked={user.isDisabled}
          onChange={() => toggleDisabled(user.id)}
        />
        </article>
      }
      { isGod &&
        <article className={styles.toggle}>
        <p>IsGod:</p>
        <Switch
          disabled={!this.props.user.isGod}
          checked={user.isDisabled}
          onChange={() => toggleDisabled(user.id)}
        />
        </article>
      }
    </section>
  );
};

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
