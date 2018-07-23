import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCohort, postTeam} from '../../store';
import {SelectButtons} from '../elements';
import styles from './index.css';

class AddForm extends Component {
  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    const {input} = this.state;
    if (!input) return;
    const {cohortId, project, name} = this.props;
    name === 'team' ?
      this.props.addNewTeam(cohortId, project, input)
      : this.props.addNewCohort(input);
    this.props.toggleAddForm();
  }

  render () {
    return (
      <section className={styles.selectOrAdd}>
        <input autoFocus className={styles.input} onChange={this.handleChange} value={this.state.input} />
        <SelectButtons
          submit={this.handleSubmit}
          toggle={this.props.toggleAddForm}
          leftSymbol="x"
        />
      </section>
    );
  }
}

const mapCohort = ({project, selectedCohort}) => ({
  project,
  name: 'cohort',
  displayName: 'AddCohort',
  cohortId: selectedCohort.id,
});
const mapTeam = ({project, selectedCohort}) => ({
  project,
  name: 'team',
  displayName: 'AddTeam',
  cohortId: selectedCohort.id,
});

const mapDispatch = (dispatch) => ({
  addNewCohort: (name) => {
    dispatch(postCohort(name));
  },
  addNewTeam: (cohortId, project, name) => {
    dispatch(postTeam(cohortId, project, name));
  }
});

export const AddCohort = connect(mapCohort, mapDispatch)(AddForm);
export const AddTeam  = connect(mapTeam, mapDispatch)(AddForm);
