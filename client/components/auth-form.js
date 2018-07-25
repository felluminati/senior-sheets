import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';
import {auth} from '../store';
import styles from './index.css';
import isEmail from 'validator/lib/isEmail';
import {BigBlackButton, BigRedButton, Title} from './elements';

class AuthForm extends Component {
  state = {
    errors: [],
  }

  validateEntries = (email, password) => {
    const errArr = [];
    if (!email.length || !isEmail(email)) errArr.push('Email is not valid!');
    if (password.length < 8) errArr.push('Password must be longer than 8 characters!');
    if (!errArr.length) return true;
    this.setState({errors: errArr});
    return false;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const validate = this.validateEntries(email, password);
    const {name} = this.props;
    if (!validate) return;
    if (this.props.name === 'signup') {
      const fellowAC = event.target.fas.value.trim();
      this.props.submitAuth(name, email, password, fellowAC);
    }
    else {
      this.props.submitAuth(name, email, password);
    }
    history.push('/home');
  }
  render () {
    const {name, displayName, error} = this.props;
    const {errors} = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit} name={name}>
         <Title>{displayName}</Title>
          <article className={styles.login__container}>
            <input className={styles.input} name="email" type="text" placeholder="Email" autoComplete="email" />
          </article>
          <article className={styles.login__container}>
            <input className={styles.input}  name="password" type="password" placeholder="Password" autoComplete={name === 'signup' ? 'new-password' : 'password'} />
          </article>
          { name === 'signup' && (
          <article className={styles.login__container}>
            <input className={styles.input}  name="fas" type="password" placeholder="Felluminati Access Key" autoComplete="new-password" />
          </article>

          )}
          <article className={styles.login__container}>
            <BigBlackButton
            type="submit"
            innerText={displayName}
            />
            <a href="/auth/google">
              <BigRedButton
              innerText={`Google ${displayName}`}
              />
            </a>
          </article>
          <article className={styles.error}>
          {error && error.response && <p> {error.response.data} </p>}
          {!!errors.length && errors.map(err => <p key={err.length}>{err}</p>)}
          </article>
        </form>
      </section>
    );
  }
}

const mapLogin = (state) => ({
    name: 'login',
    displayName: 'Login',
    error: state.user.error
});

const mapSignup = (state) => ({
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
});

const mapDispatch = (dispatch) => ({
  submitAuth(formName, email, password, fac) {
    dispatch(auth(email, password, formName, fac));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  submitAuth: PropTypes.func.isRequired,
  error: PropTypes.object
};
