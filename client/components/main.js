import React from 'react';
import {connect} from 'react-redux';
import styles from './index.css';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';

const Main = (props) => {
  const {selectedCohort, project, selectedTeam} = props;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.choiceWrapper}>
        <div className={styles.title}>Select Cohort</div>
          <SelectCohort />
      </div>

        {!!selectedCohort.id &&
        <div className={styles.choiceWrapper}>
          <div className={styles.title}>Select Project</div>
            <ChooseProject />
        </div>
        }
        {!!project.length &&
          <div className={styles.choiceWrapper}>
            <div className={styles.title}>Select Team</div>
              <SelectTeam />
          </div>
        }
        {!!selectedTeam.id &&
          <div className={styles.choiceWrapper}>
              <SelectView />
          </div>
        }
      </div>
    </div>
  );
};

const mapState = ({selectedCohort, project, selectedTeam}) => ({
  selectedCohort,
  project,
  selectedTeam,
});

Main.displayName = 'Main';
export default connect(mapState)(Main);
