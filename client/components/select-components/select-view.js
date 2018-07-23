import React from 'react';
import styles from './index.css';
import {BigRedButton, BigBlackButton} from '../elements';
import {Link} from 'react-router-dom';

const SelectView = () => (
  <section className={styles.choiceWrapper}>
    <Link to="/feedback/view">
      <BigBlackButton
      innerText="View Team" />
    </Link>
    <Link to="/feedback/add">
      <BigRedButton
      innerText="Leave Feedback" />
    </Link>
  </section>
);

SelectView.displayName = 'SelectView';
export default SelectView;
