import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';
import {fetchCohorts} from '../store';

class Main extends Component {
  componentDidMount() {
    if (!this.props.cohorts.length) this.props.loadInitialData();
  }
  render() {
    const {selectedCohort, project, selectedTeam} = this.props;
    return (
      <section>
        <SelectCohort />
        {!!selectedCohort.id && <ChooseProject /> }
        {!!project.length && <SelectTeam /> }
        {!!selectedTeam.id && <SelectView /> }
      </section>
    );
  }
}

const mapState = ({cohorts, selectedCohort, project, selectedTeam}) => ({
  cohorts,
  selectedCohort,
  project,
  selectedTeam,
});
const mapDispatch = (dispatch) => ({
  loadInitialData() {
    dispatch(fetchCohorts());
  },
});

export default connect(mapState, mapDispatch)(Main);
