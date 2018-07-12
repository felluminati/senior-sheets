import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import style from './navbar.css';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className={style.navbar}>
    <div className={style.navbar__left}>
      <img className={style.navbar__logo} src="/illuminati.png" />
    </div>
    <div className={style.navbar__leftish}>
      <span className={style.navbar__title}>Senior Reporting</span>
    </div>
    <nav className={style.navbar__right}>
      {isLoggedIn ? (
        <div>
          <Link to="/graceshopper">Grace Shopper</Link>
          <Link to="/capstone">Capstone</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
