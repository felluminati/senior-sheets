import React from 'react';
import {connect} from 'react-redux';
import styles from './index.css';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';

const Main = (props) => {
  const {selectedCohort, project, selectedTeam} = props;
  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <SelectCohort />
        {!!selectedCohort.id && <ChooseProject /> }
        {!!project.length && <SelectTeam /> }
        {!!selectedTeam.id && <SelectView /> }
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
