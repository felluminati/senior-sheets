import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './choose-project.css';
import {selectProject} from '../../store';

class ChooseProject extends Component {
  displayName = ChooseProject;
  state = {
  }
  render () {
    return (
      <div className={styles.chooseProject__container}>
        <button
        className={styles.chooseProject__button}
        onClick={this.props.handleSelectProject}
        name="graceShopper">
          Grace Shopper
        </button>
        <button
        className={`${styles.chooseProject__button} ${styles.redButton}`}
        name="capstone">
          Capstone
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cohorts: state.cohorts,
  selectedCohort: {},
});
const mapDispatch = (dispatch) => ({
  handleSelectProject: (event) => {
    dispatch(selectProject(event.target.name));
  }
});

export default connect(mapState, mapDispatch)(ChooseProject);
