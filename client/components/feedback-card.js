import React, { Component } from 'react';
import styles from './feedback-card.css';

const options = [
  '🤮',
  '🤢',
  '😨',
  '😣',
  '😕',
  '😏',
  '😊',
  '🤓',
  '😎',
  '🤩',
];

class FeedbackCard extends Component {
  constructor() {
    super();
    this.state = {
      comments: false
    };
  }


  toggleComments = () => {
    this.setState({ comments: !this.state.comments })
  }
  render() {
    const { feedback } = this.props
    return (
      <div className={styles.card} onClick={this.toggleComments}>
        <div className={styles.container} key={feedback.id}>
          <div className={styles.date}>{feedback.date}</div>
          <div className={styles.score}>{options[feedback.teamwork - 1]}</div>
          <div className={styles.score}>{options[feedback.morale - 1]}</div>
        </div>
        {this.state.comments &&
          <div>
            Comments: {feedback.comments}
          </div>}
      </div>
    )
  }
}

export default FeedbackCard;
