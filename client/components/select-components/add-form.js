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

  handleSubmit = async () => {
    const {input} = this.state;
    if (!input) return;
    const {cohortId, project, name} = this.props;
    if (name === 'team'){
      let newTeam = await this.props.addNewTeam(cohortId, project, input);
      this.props.setNewTeam(newTeam.id);
    } else {
      let newCohort = await this.props.addNewCohort(input);
      this.props.setNewCohort(newCohort.id);
    }
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
  async addNewCohort(name) {
    let data = await dispatch(postCohort(name));
    return data;
  },
  async addNewTeam(cohortId, project, name) {
    let data = await dispatch(postTeam(cohortId, project, name));
    return data;
  }
});

export const AddCohort = connect(mapCohort, mapDispatch)(AddForm);
export const AddTeam  = connect(mapTeam, mapDispatch)(AddForm);
