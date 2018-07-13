import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {SelectCohort} from './index';
import style from './navbar.css';

const Navbar = ({handleClick, isLoggedIn, user}) => (
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
          <span> {user.email} </span>
          <a href="#" onClick={handleClick}><div className={style.navbar__button}>Logout</div></a>
        </div>
      ) : (
        <div>
          <Link to="/login"><div className={style.navbar__button}>Login</div></Link>
          <Link to="/signup"><div className={style.navbar__button}>Sign Up</div></Link>
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
    isLoggedIn: !!state.user.id,
    user: state.user
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
