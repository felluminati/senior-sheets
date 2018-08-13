import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams, resetTeams} from '../../store';
import {AddTeam} from '../';
import {SelectButtons, Title} from '../elements';
import styles from './index.css';

class SelectTeam extends Component {
  state = {
    showAddForm: false,
  }

  handleChange = (event) => {
    const teamId = event.target.value;
    const foundTeam = this.props.teams.find(team => team.id === +teamId);
    this.props.handleSelect(foundTeam, 'selectedTeam');
  }

  setNewTeam = (teamId) => {
    const selectedTeam = this.props.teams.find(team => team.id === +teamId);
    this.props.handleSelect(selectedTeam, 'selectedTeam');
  }

  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }

  componentDidUpdate (prevProps) {
    const {cohortId, project, getTeams} = this.props;
    if (prevProps.project !== project || prevProps.cohortId !== cohortId) {
      getTeams(cohortId, project);
    }
  }

  componentDidMount () {
    const {cohortId, project} = this.props;
    this.props.getTeams(cohortId, project);
  }

  render () {
    const {teams, cohortId, project, selected} = this.props;
    return (
      <section className={styles.choiceWrapper}>
        <Title>Select Team</Title>
        {
          this.state.showAddForm ?
          <AddTeam toggleAddForm={this.toggleAddForm} cohortId={cohortId} project={project} setNewTeam={this.setNewTeam} /> :
          <section className={styles.selectOrAdd}>
            <select className={styles.option} onChange={this.handleChange} value={selected}>
              <option disabled value="">Select a Team</option>
              {
                !!teams.length && teams.map((team) => (
                <option key={team.id} value={team.id}>{team.teamName}</option>))
              }
            </select>
            <SelectButtons
              toggle={this.toggleAddForm}
              rightSymbol="+"
            />
          </section>
        }
      </section>
    );
  }
}

const mapState = ({teams}) => ({teams});
const mapDispatch = (dispatch) => ({
  getTeams(cohortId, project) {
    dispatch(fetchTeams(cohortId, project));
  },
  getTeamsAndReset(cohortId, project) {
    dispatch(resetTeams());
    dispatch(fetchTeams(cohortId, project));
  },
});

export default connect(mapState, mapDispatch)(SelectTeam);
