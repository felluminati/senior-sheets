import React, { Component } from 'react';
import styles from './feedback-card.css';
import moment from 'moment';

const options = [
  '🤯',
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
    const { feedback } = this.props;
    return (
      <div className={styles.card} onClick={this.toggleComments}>
        <div className={styles.container} key={feedback.id}>
          <div className={styles.date}>{moment(feedback.date).format('MM/DD/YY')}</div>
          <div className={styles.score}>{options[feedback.teamwork - 1]}</div>
          <div className={styles.score}>{options[feedback.morale - 1]}</div>
        </div>
        {this.state.comments &&
          <div style={{whiteSpace: 'pre-wrap'}}>{feedback.comments}</div>}
      </div>
    )
  }
}

export default FeedbackCard;
