import React from 'react';
import {connect} from 'react-redux';
import {SelectCohort, ChooseProject, SelectTeam, SelectView} from './index';

const Main = (props) => {
  const {selectedCohort, project, selectedTeam} = props;
  return (
    <section>
      <SelectCohort />
      {!!selectedCohort.id && <ChooseProject /> }
      {!!project.length && <SelectTeam /> }
      {!!selectedTeam.id && <SelectView /> }
    </section>
  );
};

const mapState = ({selectedCohort, project, selectedTeam}) => ({
  selectedCohort,
  project,
  selectedTeam,
});

Main.displayName = 'Main';
export default connect(mapState)(Main);
