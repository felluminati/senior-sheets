import React from 'react';
import {connect} from 'react-redux';
import styles from './index.css';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';

const Main = (props) => {
  const {selectedCohort, project, selectedTeam} = props;
  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <article className={styles.choiceWrapper}>
          <h2 className={styles.title}>Select Cohort</h2>
            <SelectCohort />
        </article>
        {!!selectedCohort.id &&
        <article className={styles.choiceWrapper}>
          <h2 className={styles.title}>Select Project</h2>
            <ChooseProject />
        </article>
        }
        {!!project.length &&
          <article className={styles.choiceWrapper}>
            <h2 className={styles.title}>Select Team</h2>
              <SelectTeam />
          </article>
        }
        {!!selectedTeam.id &&
          <article className={styles.choiceWrapper}>
              <SelectView />
          </article>
        }
      </main>
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
