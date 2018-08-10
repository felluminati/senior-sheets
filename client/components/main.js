import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';
import {fetchCohorts} from '../store';

class Main extends Component {
  state = {
    selectedTeam: {},
    selectedCohort: {},
    project: '',
  }
  componentDidMount() {
    if (!this.props.cohorts.length) this.props.loadInitialData();
  }

  handleSelect = (data, selector) => {
    this.setState({[selector]: data});
  }

  render() {
    // const {selectedCohort, project, selectedTeam} = this.props;
    console.log(this.state);
    const {selectedCohort, project, selectedTeam} = this.state;
    return (
      <section>
        <SelectCohort handleSelect={this.handleSelect} />
        {!!selectedCohort.id && <ChooseProject handleSelect={this.handleSelect} /> }
        {!!project.length && <SelectTeam handleSelect={this.handleSelect } /> }
        {!!selectedTeam.id && <SelectView handleSelect={this.handleSelect } /> }
      </section>
    );
  }
}

const mapState = ({cohorts, selectedCohort, project, selectedTeam}) => ({
  cohorts,
  project,
  selectedTeam,
  selectedCohort
});
const mapDispatch = (dispatch) => ({
  loadInitialData() {
    dispatch(fetchCohorts());
  },
});

export default connect(mapState, mapDispatch)(Main);
