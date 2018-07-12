import React, {Component} from 'react';
import styles from './select-team.css';
import {ProjectForm} from '../../components';

class SelectTeam extends Component {
  displayName = SelectTeam;
  render () {
    const {project} = this.props;
    return (
      <div className={styles.selectTeam__container}>
        <div className={styles.selectTeam__card}>
          <div className={styles.selectTeam__title}>{project} Reporting</div>
          <ProjectForm formType="Cohort" />
          <ProjectForm formType="Team" />
        </div>
      </div>
    );
  }
}

export default SelectTeam;
