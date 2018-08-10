import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCohort} from '../../store';
import {AddCohort} from '../index';
import {SelectButtons, Title} from '../elements';
import styles from './index.css';

class SelectCohort extends Component {
  state = {
    showAddForm: false,
    cohortId: ''
  }

  handleChange = (event) => {
    const cohortId = +event.target.value;
    const {cohorts} = this.props;
    const selectedCohort = cohorts.find(cohort => cohort.id === cohortId);
    this.setState({cohortId});
    this.props.handleSelect(selectedCohort, 'selectedCohort');
  }

  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
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
                cohorts.length ? cohorts.map((cohort) => {
                if (cohort.name !== 'staff') {
                  return <option key={cohort.id} value={cohort.id}>{cohort.name}</option>;
                }
                })
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

const mapState = ({cohorts}) => ({
  cohorts,
});

export default connect(mapState, null)(SelectCohort);
