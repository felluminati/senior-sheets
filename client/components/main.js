import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './main.css';
// import {} from '../store';
import {AddForm, SelectCohort, ChooseProject, SelectTeam} from './index';
import project from '../store/project';

class Main extends Component {
  displayName = Main;
  state = {
    showAddForm: false,
  }
  showAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }
  render () {
    const {selectedCohort, project} = this.props;
    return (
      <div className={styles.main__container}>
        <div className={styles.main__card}>
          <div className={styles.main__title}>Select Cohort</div>
          {!this.state.showAddForm ?
            <SelectCohort showAddForm={this.showAddForm} />
          :
            <AddForm showAddForm={this.showAddForm} />
        }
          {selectedCohort.id &&
          <div className={styles.main__choiceWrapper}>
            <div className={styles.main__title}>Select Project</div>
                <ChooseProject />
          </div>
          }
          {project.length &&
            <div className={styles.main__choiceWrapper}>
            <div className={styles.main__title}>Select Team</div>
                <SelectTeam showAddForm={this.showAddForm} />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cohorts: state.cohorts,
  selectedCohort: state.selectedCohort,
  project: state.project,
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
