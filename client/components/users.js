import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../store';

class Users extends Component {
  componentDidMount() {
   this.props.getUsers();
  }
  render() {
    const {users} = this.props;
    console.log(users);
    return (
      <section>
        {!!users.length && users.map((user) => (<p key={user.id}>{user.email}</p>))}
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
  }
});

export default connect(mapState, mapDispatch)(Users);
