import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams, selectTeam} from '../../store';
import {AddForm} from '../index';
import {SelectButtons} from '../elements';
import styles from './index.css';

class SelectTeam extends Component {
  displayName = SelectTeam;
  state = {
    teamId: '',
    showAddForm: false,
  }

  handleChange = (event) => {
    this.setState({teamId: event.target.value});
  }

  handleSubmit = () => {
    const {teamId} = this.state;
    if (!teamId) return;
    const foundTeam = this.props.teams.find(team => team.id === +teamId);
    this.props.changeTeam(foundTeam);
  }

  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }

  componentDidUpdate (prevProps) {
    const {cohortId, project, selectedCohort} = this.props;
    if (prevProps.project !== project || prevProps.selectedCohort !== selectedCohort) {
      this.props.getTeams(cohortId, project);
    }
  }
  componentDidMount () {
    const {cohortId, project} = this.props;
    this.props.getTeams(cohortId, project);
  }
  render () {
    const {teams} = this.props;
    return ( !this.state.showAddForm ?

      <div className={styles.selectOrAdd}>
        <select className={styles.option} onChange={this.handleChange} defaultValue="">
          <option disabled value="">Select a Team</option>
          { teams.length ? teams.map((team) => (
            <option key={team.id} value={team.id}>{team.teamName}</option>))
            : <option />}
        </select>
        <SelectButtons
          submit={this.handleSubmit}
          toggle={this.toggleAddForm}
          leftSymbol="+"
        />
      </div>
      :
      <AddForm toggleAddForm={this.toggleAddForm} />
    );
  }
}

const mapState = ({project, teams, selectedCohort, selectedTeam}) => ({
  project,
  teams,
  selectedCohort,
  selectedTeam,
  cohortId: selectedCohort.id,
});
const mapDispatch = (dispatch) => ({
  changeTeam: (team) => {
    dispatch(selectTeam(team));
  },
  getTeams: (cohortId, project) => {
    dispatch(fetchTeams(cohortId, project));
  }
});

export default connect(mapState, mapDispatch)(SelectTeam);
