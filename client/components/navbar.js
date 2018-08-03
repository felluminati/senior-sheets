import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, resetStore} from '../store';
import style from './navbar.css';

const Navbar = ({handleClick, isLoggedIn, user, isAdmin}) => (
  <nav className={style.navbar}>
    <section className={style.navbar__left}>
      <img className={style.navbar__logo} src="/illuminati.png" />
    </section>
    <section className={style.navbar__leftish}>
      <h1 className={style.navbar__title}>Senior Reporting</h1>
    </section>
    <section className={style.navbar__right}>
      {isLoggedIn && isAdmin && (
        <article>
          <Link to="/home"><div className={style.button}>Choose Team</div></Link>
          <Link to="/home"><div className={style.button}>Users</div></Link>
          <a href="#" onClick={handleClick}><div className={style.button}>Logout</div></a>
        </article>
      )} {isLoggedIn && !isAdmin  && (
        <article>
          <a href="#" onClick={handleClick}><div className={style.button}>Logout</div></a>
        </article>
      )} {!isLoggedIn && !isAdmin && (
        <article>
          <Link to="/login"><div className={style.button}>Login</div></Link>
          <Link to="/signup"><div className={style.button}>Sign Up</div></Link>
        </article>
      )}
    </section>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => ({
  isLoggedIn: !!state.user.id,
  isAdmin: !!state.user.isAdmin,
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
