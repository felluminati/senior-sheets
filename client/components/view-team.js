import React, { Component } from 'react';
import { Title } from './elements';
import styles from './feedback-card.css';
import { FeedbackCard } from './index';
import { connect } from 'react-redux';
import EmojiKey from './emoji-key';
import { fetchTeamFeedback } from '../store';

class ViewTeam extends Component {
  componentDidMount(){
    this.props.getTeamFeedback(this.props.teamId);
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
        {this.props.teamFeedback.map(feedback => {
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
    teamId: state.selectedTeam.id,
    selectedTeam: state.selectedTeam,
    teamFeedback: state.teamFeedback
  };
};

const mapDispatch = (dispatch) => ({
  getTeamFeedback(teamId) {
    dispatch(fetchTeamFeedback(teamId));
  }
});

export default connect(mapState, mapDispatch)(ViewTeam);
