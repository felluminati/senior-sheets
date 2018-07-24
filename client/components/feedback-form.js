import React, {Component} from 'react';
import {Title} from './elements';
import styles from './index.css';
class FeedbackForm extends Component {
  state = {
    teamwork: '',
    morale: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render () {
    const options = [
      {emoji: '🤯', num: 1},
      {emoji: '🤢', num: 2},
      {emoji: '😨', num: 3},
      {emoji: '😣', num: 4},
      {emoji: '😕', num: 5},
      {emoji: '😏', num: 6},
      {emoji: '😊', num: 7},
      {emoji: '🤓', num: 8},
      {emoji: '😎', num: 9},
      {emoji: '🤩', num: 10}
    ];
    console.log(this.state);
    return (
      <main>
        <Title>Feedback Form</Title>
        <Title>Teamwork</Title>
        <form >
          <article className={styles.feedback__radioList}>
            {options.map((elem) => (
              <label
              key={`teamwork${elem.num}`}
              htmlFor={`teamwork${elem.num}`}
              className={+this.state.teamwork === elem.num ? styles.checked : ''}
              >
                <input
                  type="radio"
                  name="teamwork"
                  id={`teamwork${elem.num}`}
                  value={elem.num}
                  checked={+this.state.teamwork === elem.num}
                  onChange={this.handleChange}
                  />
                {elem.emoji}
              </label>
              ))}
          </article>
        <Title>Morale</Title>
        <article className={styles.feedback__radioList}>
          {options.map((elem) => (
            <label
              key={`morale${elem.num}`}
              htmlFor={`morale${elem.num}`}
              className={this.state.morale == elem.num ? styles.checked : ''}
              >
              <input
                type="radio"
                name="morale"
                id={`morale${elem.num}`}
                value={elem.num}
                checked={this.state.morale == elem.num}
                onChange={this.handleChange}
                />
              {elem.emoji}
            </label>
            ))}
        </article>
          <textarea name="comments" />
        </form>
      </main>
    );
  }
}

export default FeedbackForm;
