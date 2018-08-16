import React, { Component } from 'react';
import { Title, BigRedButton } from './elements';
import styles from './feedback-card.css';
import { FeedbackCard } from './index';
import { connect } from 'react-redux';
import EmojiKey from './emoji-key';
import { fetchTeamFeedback, deleteTeamFeedback, fetchTeam } from '../store';
import {Link} from 'react-router-dom';

class ViewTeam extends Component {
  componentDidMount(){
    if (!this.props.selectedTeam.id){
      this.props.getTeam(this.teamId);
    }
    this.props.getTeamFeedback(this.teamId);
  }

  deleteHandler = (feedbackId) => {
    if (window.confirm('Are you sure you wish to delete this item?')) this.props.removeTeamFeedback(feedbackId);
  }

  render() {
    this.teamId = this.props.match.params.teamId;
    this.project = this.props.match.params.project;
    this.cohort = this.props.match.params.cohort;
    this.teamInfo = {teamId: this.teamId, project: this.project, cohort: this.cohort};
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
              <FeedbackCard
                teamInfo={this.teamInfo}
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
    selectedTeam
  };
};

const mapDispatch = (dispatch) => ({
  getTeamFeedback(teamId) {
    dispatch(fetchTeamFeedback(teamId));
  },
  removeTeamFeedback(feedbackId) {
    dispatch(deleteTeamFeedback(feedbackId));
  },
  getTeam(teamId){
    dispatch(fetchTeam(teamId));
  }
});

export default connect(mapState, mapDispatch)(ViewTeam);
