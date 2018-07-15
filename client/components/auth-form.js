import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import styles from './index.css';
import {BigBlackButton, BigRedButton} from './elements';

/**
 * COMPONENT
 */

class AuthForm extends Component {
  state = {
    errors: [],
  }

  isEmail = (email) => {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
  }

  validateEntries = (email, password) => {
    const errArr = [];
    if (!email.length || !this.isEmail(email)) errArr.push('Email is not valid!');
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
    if (!validate) return;
    if (this.props.name === 'singup') {
      const fellowAC = event.target.fas.value.trim();
      this.props.submitAuth(this.props.name, email, password, fellowAC);
    }
    else {
      this.props.submitAuth(this.props.name, email, password);
    }
  }
  render () {
    const {name, displayName, error} = this.props;
    const {errors} = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
        <form onSubmit={this.handleSubmit} name={name}>
          <div className={styles.title}>{displayName}</div>
            <div className={styles.login__container}>
              <input className={styles.input} name="email" type="text" placeholder="Email" autoComplete="email" />
            </div>
            <div className={styles.login__container}>
              <input className={styles.input}  name="password" type="password" placeholder="Password" autoComplete={name === 'signup' ? 'new-password' : 'password'} />
            </div>
            { name === 'signup' && (
            <div className={styles.login__container}>
              <input className={styles.input}  name="fas" type="password" placeholder="Felluminati Access Key" autoComplete="new-password" />
            </div>

            )}
            <div className={styles.login__container}>
              <BigBlackButton
              type="submit"
              innerText={displayName}
              />
              <a href="/auth/google">
                <BigRedButton
                innerText={`Google ${displayName}`}
                />
              </a>
            </div>
            <div className={styles.error}>
            {error && error.response && <p> {error.response.data} </p>}
            {!!errors.length && errors.map(err => <p key={err.length}>{err}</p>)}
            </div>
        </form>
        </div>
      </div>
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
  submitAuth(formName, email, password, fas) {
    dispatch(auth(email, password, formName, fas));
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
