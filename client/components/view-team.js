import React, { Component } from 'react';
import { Title } from './elements';
import styles from './feedback-card.css';
import { FeedbackCard } from './index';
import { connect } from 'react-redux';
import EmojiKey from './emoji-key';


const dumbData = [
  { id: 1, date: '7/23', teamwork: 7, morale: 6, comments: 'They seemed a little sad but worked well' },
  { id: 2, date: '7/24', teamwork: 8, morale: 9, comments: 'Bad day to be a waffle' },
  { id: 3, date: '7/25', teamwork: 4, morale: 5, comments: 'John was sick and Randy got mad at Clarissa' },
]

class ViewTeam extends Component {
  constructor() {
    super()
    this.dumbData = dumbData;
  }
  render() {
    return (
      <div>
        <Title>{this.props.selectedTeam.teamName}</Title>
        <div className={styles.container}>
          <div className={styles.date}>Date</div>
          <div className={styles.score}>Teamwork</div>
          <div className={styles.score}>Morale</div>
        </div>
        {dumbData.map(feedback => {
          return (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          )
        })}
        <EmojiKey />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    selectedTeam: state.selectedTeam
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ViewTeam);
