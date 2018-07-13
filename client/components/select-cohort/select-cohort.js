import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCohort} from '../../store';

class SelectCohort extends Component {
  displayName = SelectCohort;
  state = {
    selectedCohort: this.props.selectedCohort.name || '',
  }
  handleChange = (event) => {
    this.setState({selectedCohort: event.target.value});
  }

  handleSubmit = () => {
    if (!this.state.selectedCohort) return;
    const selectedCohort = this.props.cohorts.find(cohort => cohort.name === this.state.selectedCohort);
    this.props.changeCohort(selectedCohort);
  }
  render () {
    const {cohorts, showAddForm} = this.props;
    return (
      <div className="main__selectOrAdd">
        <select className="main__option" onChange={this.handleChange} value={this.state.selectedCohort}>
          <option selected disabled value="">Select a Cohort</option>
          { cohorts.length ? cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.name}>{cohort.name}</option>))
            : <option />}
        </select>
        <button className="main__button" onClick={this.handleSubmit}>✓</button>
        <button className="main__button main__addButton" onClick={showAddForm}>+</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cohorts: state.cohorts,
  selectedCohort: state.selectedCohort,
  project: state.project,
});
const mapDispatch = (dispatch) => ({
  changeCohort: (cohortName) => {
    dispatch(selectCohort(cohortName));
  }
});

export default connect(mapState, mapDispatch)(SelectCohort);
