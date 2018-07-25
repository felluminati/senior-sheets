import React, { Component } from 'react';
import styles from './feedback-card.css';
import {LilRedButton} from './elements';
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
      <div className={styles.card} >
        <div className={styles.container} key={feedback.id} onClick={this.toggleComments} >
          <div className={styles.date}>{moment(feedback.date).format('MM/DD/YY')}</div>
          <div className={styles.score}>{options[feedback.teamwork - 1]}</div>
          <div className={styles.score}>{options[feedback.morale - 1]}</div>
        </div>
        {this.state.comments &&
          <div className={styles.dropdown}>
            <div style={{whiteSpace: 'pre-wrap'}}>{feedback.comments}</div>
            <LilRedButton innerText="x" clickHandler={() => this.props.deleteHandler(feedback.id)} />
          </div>}
      </div>
    )
  }
}

export default FeedbackCard;
