import React, { Component } from 'react';
import { Title, BigRedButton } from './elements';
import styles from './feedback-card.css';
import { FeedbackCard } from './index';
import { connect } from 'react-redux';
import EmojiKey from './emoji-key';
import { fetchTeamFeedback, deleteTeamFeedback } from '../store';
import {Link} from 'react-router-dom';

class ViewTeam extends Component {
  componentDidMount(){
    this.teamId = this.props.match.params.teamId;
    this.project = this.props.match.params.project;
    this.cohort = this.props.match.params.cohort;
    const cohortId = this.props.cohorts.find(cohort => cohort.name === this.cohort);
    // console.log('cohort', this.props.cohort);
    this.props.getTeamFeedback(this.teamId);
  }

  deleteHandler = (feedbackId) => {
    if (window.confirm('Are you sure you wish to delete this item?')) this.props.removeTeamFeedback(feedbackId);
  }

  render() {
    return (
      <div className={styles.view_team_container}>
        <div>
          <Title>Team Name</Title>
          <div className={styles.container}>
            <div className={styles.date}>Date</div>
            <div className={styles.score}>Teamwork</div>
            <div className={styles.score}>Morale</div>
          </div>
          {this.props.teamFeedback.map(feedback => {
            return (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                deleteHandler={this.deleteHandler} />
            );
          })}
        </div>
        <Link to={`/feedback/${this.cohort}/${this.project}/${this.teamId}/add`}>
          <BigRedButton
          innerText="Leave Feedback" />
        </Link>
        <EmojiKey />
      </div>
    );
  }
}

const mapState = ({teams, selectedTeam, teamFeedback, cohorts}) => {
  return {
    teams,
    teamFeedback: teamFeedback.sort((a, b) => new Date(b.date) - new Date(a.date)),
    cohorts,
  };
};

const mapDispatch = (dispatch) => ({
  getTeamFeedback(teamId) {
    dispatch(fetchTeamFeedback(teamId));
  },
  removeTeamFeedback(feedbackId) {
    dispatch(deleteTeamFeedback(feedbackId));
  },
});

export default connect(mapState, mapDispatch)(ViewTeam);
