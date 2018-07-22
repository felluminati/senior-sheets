import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams, selectTeam, resetTeam} from '../../store';
import {AddForm} from '../';
import {SelectButtons, Title} from '../elements';
import styles from './index.css';

class SelectTeam extends Component {
  displayName = SelectTeam;
  state = {
    teamId: this.props.selectedTeam.id || '',
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
    const {cohortId, project, selectedCohort, getTeams} = this.props;
    if (prevProps.project !== project || prevProps.selectedCohort !== selectedCohort) {
      getTeams(cohortId, project);
    }
  }
  componentDidMount () {
    const {cohortId, project} = this.props;
    this.props.getTeams(cohortId, project);
  }
  render () {
    const {teams} = this.props;
    return (
      <section className={styles.choiceWrapper}>
        <Title>Select Team</Title>
        {
          this.state.showAddForm ?
          <AddForm toggleAddForm={this.toggleAddForm} /> :
          <section className={styles.selectOrAdd}>
            <select className={styles.option} onChange={this.handleChange} value={this.state.teamId}>
              <option disabled value="">Select a Team</option>
              {
                !!teams.length && teams.map((team) => (
                <option key={team.id} value={team.id}>{team.teamName}</option>))
              }
            </select>
            <SelectButtons
              submit={this.handleSubmit}
              toggle={this.toggleAddForm}
              leftSymbol="+"
            />
          </section>
        }
      </section>
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
    dispatch(resetTeam());
  },
});

export default connect(mapState, mapDispatch)(SelectTeam);
