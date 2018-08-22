import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../store';
import {UserCard} from './';

class Users extends Component {
  componentDidMount() {
   this.props.getUsers();
  }
  render() {
    const {users, enabledUsers, disabledUsers} = this.props;
    return (
      <section>
        <h3>Enabled Users</h3>
        {!!users.length && enabledUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
        <br />
        <h3>Disabled Users</h3>
        {!!users.length && disabledUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </section>
    );
  }
}

const mapState = ({users, user}) => ({
  user,
  users,
  enabledUsers: users.filter((elem) => !elem.isDisabled),
  disabledUsers: users.filter((elem) => elem.isDisabled),
});
const mapDispatch = (dispatch) => ({
  getUsers() {
    dispatch(fetchUsers());
  },
});

export default connect(mapState, mapDispatch)(Users);
