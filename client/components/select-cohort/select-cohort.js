import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCohort} from '../../store';
import {AddForm} from '../index';

class SelectCohort extends Component {
  displayName = SelectCohort;
  state = {
    selectedCohort: this.props.selectedCohort.id || '',
    showAddForm: false,
  }
  handleChange = (event) => {
    this.setState({selectedCohort: event.target.value});
  }
  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }
  handleSubmit = () => {
    if (!this.state.selectedCohort) return;
    const selectedCohort = this.props.cohorts.find(cohort => cohort.id === +this.state.selectedCohort);
    this.props.changeCohort(selectedCohort);
  }
  render () {
    const {cohorts} = this.props;
    return ( !this.state.showAddForm ?
      <div className="main__selectOrAdd">
        <select className="main__option" onChange={this.handleChange} value={this.state.selectedCohort}>
          <option selected disabled value="">Select a Cohort</option>
          { cohorts.length ? cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.id}>{cohort.name}</option>))
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
