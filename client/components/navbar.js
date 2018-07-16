import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, resetStore} from '../store';
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
const mapState = (state) => ({
  isLoggedIn: !!state.user.id,
  user: state.user
});

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
    dispatch(resetStore());
  }
});

Navbar.displayName = 'Navbar';
export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
