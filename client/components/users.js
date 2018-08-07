import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers, changeAdmin, changeDisabled} from '../store';
import Switch from 'react-switch';

class Users extends Component {
  componentDidMount() {
   this.props.getUsers();
  }
  render() {
    const {users, toggleAdmin, toggleDisabled} = this.props;
    console.log(users);
    return (
      <section>
        {!!users.length && users.map((user) => (
          <section key={user.id}>
          <span>{user.email}</span>
          Admin:
          <Switch
            checked={user.isAdmin}
            onChange={() => toggleAdmin(user.id)}
          />
          Disabled:
          <Switch
            checked={user.isDisabled}
            onChange={() => toggleDisabled(user.id)}
          />
          </section>
          ))}
          <p>THIS IS A WORK IN PROGRESS OK! :D :D :D</p>
      </section>
    );
  }
}

const mapState = ({users}) => ({
  users
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
