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

  handleKeyPress = (event) => {
    if (event.key === 'Enter') this.handleSubmit();
  }

  render () {
    return (
      <section className={styles.selectOrAdd}>
        <input autoFocus className={styles.input} onChange={this.handleChange} value={this.state.input} onKeyPress={this.handleKeyPress} />
        <SelectButtons
          submit={this.handleSubmit}
          toggle={this.props.toggleAddForm}
          rightSymbol="x"
        />
      </section>
    );
  }
}

const mapCohort = () => ({
  name: 'cohort',
  displayName: 'AddCohort',
});
const mapTeam = () => ({
  name: 'team',
  displayName: 'AddTeam',
});

const mapDispatch = (dispatch) => ({
  addNewCohort(name) {
    dispatch(postCohort(name));
  },
  addNewTeam(cohortId, project, name) {
    dispatch(postTeam(cohortId, project, name));
  }
});

export const AddCohort = connect(mapCohort, mapDispatch)(AddForm);
export const AddTeam  = connect(mapTeam, mapDispatch)(AddForm);
