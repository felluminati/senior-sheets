import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCohort} from '../../store';
import {AddCohort} from '../index';
import {SelectButtons, Title} from '../elements';
import styles from './index.css';

class SelectCohort extends Component {
  state = {
    showAddForm: false,
  }

  handleChange = (event) => {
    const cohortId = event.target.value;
    const {cohorts, changeCohort} = this.props;
    const selectedCohort = cohorts.find(cohort => cohort.id === +cohortId);
    changeCohort(selectedCohort);
  }

  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }

  render () {
    const {cohorts, selectedCohort} = this.props;
    return (
      <section className={styles.choiceWrapper}>
        <Title>Select Cohort</Title>
        {this.state.showAddForm ?
          <AddCohort toggleAddForm={this.toggleAddForm} /> :
          <article className={styles.selectOrAdd}>
            <select className={styles.option} onChange={this.handleChange} value={selectedCohort.id}>
              <option disabled value="">Select a Cohort</option>
              {
                cohorts.length ? cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>{cohort.name}</option>))
                : <option />
              }
            </select>
            <SelectButtons
              toggle={this.toggleAddForm}
              rightSymbol="+"
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
