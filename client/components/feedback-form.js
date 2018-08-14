import React, { Component } from 'react';
import { Title } from './elements';
import { connect } from 'react-redux';
import styles from './index.css';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {postTeamFeedback, putTeamFeedback} from '../store';

class FeedbackForm extends Component {
  state = {
    teamwork: '',
    morale: '',
    date: moment(new Date()).format('YYYY-M-D'),
    comments: '',
  }

  handleEmojiChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = (date) => {
    this.setState({ date });
  }

  handleCommentsChange = (event) => {
    this.setState({ comments: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { teamwork, morale, date, comments } = this.state;
    if (this.props.name === 'edit'){
      this.props.editTeamFeedback({id: this.props.currentFeedback.id, teamwork, morale, date, comments});
    }
    else {
      this.props.submitTeamFeedback(+this.teamId, { teamwork, morale, date, comments });
    }
  }

  componentDidMount(){
    if (this.props.name === 'edit'){
      const {currentFeedback} = this.props;
      const {teamwork, morale, date, comments} = currentFeedback;
      this.setState({teamwork, morale, date: moment(date).format('YYYY-M-D'), comments });
    }
    this.teamId = this.props.match.params.teamId;
  }

  render() {
    const options = [
      { emoji: '🤯', num: 1 },
      { emoji: '🤢', num: 2 },
      { emoji: '😨', num: 3 },
      { emoji: '😣', num: 4 },
      { emoji: '😕', num: 5 },
      { emoji: '😏', num: 6 },
      { emoji: '😊', num: 7 },
      { emoji: '🤓', num: 8 },
      { emoji: '😎', num: 9 },
      { emoji: '🤩', num: 10 }
    ];
    return (
      <main>
        <Title>Feedback Form</Title>
        <form method="post" onSubmit={this.handleSubmit}>
          <section>
            <h2 className={styles.feedback__title}>Date:</h2>
            <article className={styles.feedback__date}>
              <DayPickerInput value={this.state.date} onDayChange={this.handleDateChange} />
            </article>
          </section>
          <section>
            <h2 className={styles.feedback__title}>Teamwork:</h2>
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
                    onChange={this.handleEmojiChange}
                  />
                  {elem.emoji}
                </label>
              ))}
            </article>
          </section>
          <section>
            <h2 className={styles.feedback__title}>Morale:</h2>
            <article className={styles.feedback__radioList}>
              {options.map((elem) => (
                <label
                  key={`morale${elem.num}`}
                  htmlFor={`morale${elem.num}`}
                  className={+this.state.morale === elem.num ? styles.checked : ''}
                >
                  <input
                    type="radio"
                    name="morale"
                    id={`morale${elem.num}`}
                    value={elem.num}
                    checked={this.state.morale == elem.num}
                    onChange={this.handleEmojiChange}
                  />
                  {elem.emoji}
                </label>
              ))}
            </article>
          </section>
          <section>
            <h2 className={styles.feedback__title}>Comments:</h2>
            <article>
              <textarea className={styles.feedback__comments} name="comments" value={this.state.comments} onChange={this.handleCommentsChange} />
            </article>
          </section>
          <input type="submit" value="Submit Feedback" />
        </form>
      </main>
    );
  }
}

const mapAdd = state => ({

});

const mapEdit = (state, ownProps) => ({
  name: 'edit',
  displayName: 'EditFeedbackForm',
  currentFeedback: state.teamFeedback.find(elem => elem.id === +ownProps.match.params.feedbackId)
});

const mapDispatch = (dispatch) => ({
  submitTeamFeedback(teamId, feedback) {
    dispatch(postTeamFeedback(teamId, feedback));
  },
  editTeamFeedback(feedback) {
    dispatch(putTeamFeedback(feedback));
  }
});

export const AddFeedbackForm = connect(mapAdd, mapDispatch)(FeedbackForm);
export const EditFeedbackForm = connect(mapEdit, mapDispatch)(FeedbackForm);
