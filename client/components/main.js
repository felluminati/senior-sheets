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
    if (selector === 'selectedCohort') {
      this.setState({[selector]: data, selectedTeam: {}, project: ''});
    }
    if (selector === 'project') {
      this.setState({[selector]: data, selectedTeam: {}});
    }
    else {
      this.setState({[selector]: data});
    }
  }

  render() {
    const {selectedCohort, project, selectedTeam} = this.state;
    return (
      <section>
        <SelectCohort handleSelect={this.handleSelect} />
        {!!selectedCohort.id && <ChooseProject handleSelect={this.handleSelect} /> }
        {!!project && <SelectTeam
          handleSelect={this.handleSelect }
          cohortId={selectedCohort.id} project={project}
          selected={selectedTeam.id ? selectedTeam.id : ''} /> }
        {!!selectedTeam.id && <SelectView handleSelect={this.handleSelect } /> }
      </section>
    );
  }
}

const mapState = ({cohorts}) => ({cohorts});
const mapDispatch = (dispatch) => ({
  loadInitialData() {
    dispatch(fetchCohorts());
  },
});

export default connect(mapState, mapDispatch)(Main);
