import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams } from '../../store';

class SelectTeam extends Component {
  displayName = SelectTeam;
  state = {
    selectedTeam: '',
  }
  handleChange = (event) => {
    this.setState({selectedTeam: event.target.value});
  }
  handleSubmit = () => {
    if (!this.state.selectedTeam) return;
    const {project, cohortId, changeTeam} = this.props;
    changeTeam(cohortId, project, this.state.selectedTeam);
  }
  componentDidMount () {
    const {cohortId, project} = this.props;
    this.props.getTeams(cohortId, project);
  }
  render () {
    const {teams, showAddForm} = this.props;
    return (
      <div className="main__selectOrAdd">
        <select className="main__option" onChange={this.handleChange} value={this.state.selectedTeam}>
          <option selected disabled value="">Select a Team</option>
          { teams.length ? teams.map((team) => (
            <option key={team.id} value={team.teamName}>{team.teamName}</option>))
            : <option />}
        </select>
        <button className="main__button" onClick={this.handleSubmit}>✓</button>
        <button className="main__button main__addButton" onClick={showAddForm}>+</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  project: state.project,
  teams: [],
  cohortId: state.selectedCohort.id,
});
const mapDispatch = (dispatch) => ({
  changeTeam: (cohortId, project, newTeam) => {
    console.log(newTeam);
  },
  getTeams: (cohortId, project) => {
    dispatch(fetchTeams(cohortId, project));
  }
});

export default connect(mapState, mapDispatch)(SelectTeam);
