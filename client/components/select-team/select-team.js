import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams } from '../../store';
import {AddForm} from '../index';

class SelectTeam extends Component {
  displayName = SelectTeam;
  state = {
    selectedTeam: '',
    showAddForm: false,
  }
  handleChange = (event) => {
    this.setState({selectedTeam: event.target.value});
  }
  handleSubmit = () => {
    if (!this.state.selectedTeam) return;
    const {project, cohortId, changeTeam} = this.props;
    const selectedTeam = this.props.teams.find(team => team.id === +this.state.selectedTeam);
    changeTeam(cohortId, project, selectedTeam);
  }
  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }
  componentDidMount () {
    const {cohortId, project} = this.props;
    this.props.getTeams(cohortId, project);
  }
  render () {
    const {teams} = this.props;
    return ( !this.state.showAddForm ?

      <div className="main__selectOrAdd">
        <select className="main__option" onChange={this.handleChange} value={this.state.selectedTeam}>
          <option selected disabled value="">Select a Team</option>
          { teams.length ? teams.map((team) => (
            <option key={team.id} value={team.id}>{team.teamName}</option>))
            : <option />}
        </select>
        <button className="main__button" onClick={this.handleSubmit}>✓</button>
        <button className="main__button main__addButton" onClick={this.toggleAddForm}>+</button>
      </div>
      :
      <AddForm toggleAddForm={this.toggleAddForm} />
    );
  }
}

const mapState = (state) => ({
  project: state.project,
  teams: state.teams,
  cohortId: state.selectedCohort.id,
});
const mapDispatch = (dispatch) => ({
  changeTeam: (cohortId, project, team) => {
    console.log(team);
  },
  getTeams: (cohortId, project) => {
    dispatch(fetchTeams(cohortId, project));
  }
});

export default connect(mapState, mapDispatch)(SelectTeam);
