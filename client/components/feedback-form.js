import React, {Component} from 'react';
import {Title} from './elements';
import styles from './index.css';
class FeedbackForm extends Component {
  state = {}
  render () {
    const options = [
      {emoji: '🤮', num: 1},
      {emoji: '🤢', num: 2},
      {emoji: '😨', num: 3},
      {emoji: '😣', num: 4},
      {emoji: '😕', num: 5},
      {emoji: '😏', num: 6},
      {emoji: '😊', num: 7},
      {emoji: '🤓', num: 8},
      {emoji: '😎', num: 9}
    ];
    return (
      <main>
        <Title>Feedback Form</Title>
        <Title>Teamwork</Title>
        <form >
          <article className={styles.feedback__radioList}>
            {options.map((elem) => (
              <label key={`teamwork${elem.num}`} htmlFor={elem.num}>
                <input type="radio" name="teamwork" value={elem.num} />{elem.emoji}
              </label>
              ))}
          </article>
        <Title>Morale</Title>
        <article className={styles.feedback__radioList}>
          {options.map((elem) => (
            <label key={`morale${elem.num}`}>
              <input type="radio" name="morale" value={elem.num} />{elem.emoji}
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
