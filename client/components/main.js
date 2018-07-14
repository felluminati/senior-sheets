import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './main.css';
import {SelectCohort, ChooseProject, SelectTeam} from './index';

class Main extends Component {
  displayName = Main;
  render () {
    const {selectedCohort, project} = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>Select Cohort</div>
            <SelectCohort showAddForm={this.showAddForm} />

          {!!selectedCohort.id &&
          <div className={styles.choiceWrapper}>
            <div className={styles.title}>Select Project</div>
              <ChooseProject />
          </div>
          }
          {!!project.length &&
            <div className={styles.choiceWrapper}>
              <div className={styles.title}>Select Team</div>
                <SelectTeam showAddForm={this.showAddForm} />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  selectedCohort: state.selectedCohort,
  project: state.project,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
