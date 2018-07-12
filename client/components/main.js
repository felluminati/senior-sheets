import React, {Component} from 'react';
import styles from './main.css';

class ChooseCohort extends Component {
  displayName = ChooseCohort;
  render () {
    // DISPLAY COHORTS HERE
    return (
      <div className={styles.main__container}>

        <div className={styles.main__selectWrapper}>
          <div className={styles.main__title}>Choose Cohort:</div>
          <div className={styles.main__choose}>
            <select className={styles.main__select} >
              <option>1806</option>
              <option>1808</option>
            </select>
            <button className={styles.main__button}>+</button>
          </div>
        </div>

        <div className={styles.main__selectWrapper}>
          <div className={styles.main__title}>Choose Team:</div>
          <div className={styles.main__choose}>
            <select className={styles.main__select} >
              <option>Team 312</option>
              <option>Charley's Angels</option>
            </select>
            <button className={styles.main__button}>+</button>
          </div>


        </div>

      </div>
    );
  }
}

export default ChooseCohort;
