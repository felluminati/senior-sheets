import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCohort, postTeam} from '../../store';


class AddForm extends Component {
  displayname = 'AddForm';
  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    if (!this.state.input) return;
    const {cohortId, project} = this.props;
    const {input} = this.state;
    project ?
      this.props.addNewTeam(cohortId, project, input)
      : this.props.addNewCohort(input);
    this.props.toggleAddForm();
  }

  render () {
    return (
      <div className="main__selectOrAdd">
        <input autoFocus className="main__input" onChange={this.handleChange} value={this.state.input} />
        <button className="main__button" onClick={this.handleSubmit}>✓</button>
        <button className="main__button main__addButton" onClick={this.props.toggleAddForm}>x</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cohorts: state.cohorts,
  cohortId: state.selectedCohort.id,
  project: state.project,
  teams: state.teams,
});
const mapDispatch = (dispatch) => ({
  addNewCohort: (name) => {
    dispatch(postCohort(name));
  },
  addNewTeam: (cohortId, project, name) => {
    dispatch(postTeam(cohortId, project, name));
  }
});

export default connect(mapState, mapDispatch)(AddForm);
