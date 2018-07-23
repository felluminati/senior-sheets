import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCohort} from '../../store';
import {AddCohort} from '../index';
import {SelectButtons, Title} from '../elements';
import styles from './index.css';

class SelectCohort extends Component {
  state = {
    cohortId: this.props.selectedCohort.id || '',
    showAddForm: false,
  }

  handleChange = (event) => {
    this.setState({cohortId: event.target.value});
  }

  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }

  handleSubmit = () => {
    const {cohortId} = this.state;
    const {cohorts, changeCohort} = this.props;
    if (!cohortId) return;
    const selectedCohort = cohorts.find(cohort => cohort.id === +cohortId);
    changeCohort(selectedCohort);
  }

  render () {
    const {cohorts} = this.props;
    return (
      <section className={styles.choiceWrapper}>
        <Title>Select Cohort</Title>
        {this.state.showAddForm ?
          <AddCohort toggleAddForm={this.toggleAddForm} /> :
          <article className={styles.selectOrAdd}>
            <select className={styles.option} onChange={this.handleChange} value={this.state.cohortId}>
              <option disabled value="">Select a Cohort</option>
              {
                cohorts.length ? cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>{cohort.name}</option>))
                : <option />
              }
            </select>
            <SelectButtons
              submit={this.handleSubmit}
              toggle={this.toggleAddForm}
              leftSymbol="+"
            />
          </article>
        }
      </section>
    );
  }
}

const mapState = ({cohorts, selectedCohort}) => ({
  cohorts,
  selectedCohort,
});
const mapDispatch = (dispatch) => ({
  changeCohort(cohortName) {
    dispatch(selectCohort(cohortName));
  }
});

export default connect(mapState, mapDispatch)(SelectCohort);
