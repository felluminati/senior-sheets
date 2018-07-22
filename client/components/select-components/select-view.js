import React from 'react';
import styles from './index.css';
import {BigRedButton, BigBlackButton} from '../elements';
import {Link} from 'react-router-dom';

const SelectView = () => (
  <section className={styles.choiceWrapper}>
    <Link to="/home">
      <BigBlackButton
      innerText="View Team" />
    </Link>
    <Link to="/home">
      <BigRedButton
      innerText="Leave Feedback" />
    </Link>
  </section>
);

SelectView.displayName = 'SelectView';
export default SelectView;
