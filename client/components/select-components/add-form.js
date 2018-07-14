import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCohort, postTeam} from '../../store';
import {SelectButtons} from '../elements';
import styles from './index.css';

class AddForm extends Component {
  displayname = 'AddForm';
  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    const {input} = this.state;
    if (!input) return;
    const {cohortId, project} = this.props;
    project ?
      this.props.addNewTeam(cohortId, project, input)
      : this.props.addNewCohort(input);
    this.props.toggleAddForm();
  }

  render () {
    return (
      <div className={styles.selectOrAdd}>
        <input autoFocus className={styles.input} onChange={this.handleChange} value={this.state.input} />
        <SelectButtons
          submit={this.handleSubmit}
          toggle={this.props.toggleAddForm}
          leftSymbol="x"
        />
      </div>
    );
  }
}

const mapState = ({cohorts, project, selectedCohort}) => ({
  cohorts,
  project,
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

export default connect(mapState, mapDispatch)(AddForm);
