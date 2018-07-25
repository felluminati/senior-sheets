import React, { Component } from 'react';
import { Title, BigRedButton } from './elements';
import styles from './feedback-card.css';
import { FeedbackCard } from './index';
import { connect } from 'react-redux';
import EmojiKey from './emoji-key';
import { fetchTeamFeedback } from '../store';
import {Link} from 'react-router-dom';

class ViewTeam extends Component {
  componentDidMount(){
    this.props.getTeamFeedback(this.props.teamId);
  }

  render() {
    return (
      <div className={styles.view_team_container}>
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
        </div>
        <Link to="/feedback/add">
          <BigRedButton
          innerText="Leave Feedback" />
        </Link>
        <EmojiKey />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    teamId: state.selectedTeam.id,
    selectedTeam: state.selectedTeam,
    teamFeedback: state.teamFeedback.sort((a, b) => new Date(b.date) - new Date(a.date))
  };
};

const mapDispatch = (dispatch) => ({
  getTeamFeedback(teamId) {
    dispatch(fetchTeamFeedback(teamId));
  }
});

export default connect(mapState, mapDispatch)(ViewTeam);
