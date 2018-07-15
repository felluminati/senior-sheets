import React from 'react';
import styles from './index.css';
import {BigRedButton, BigBlackButton} from '../elements';
import {Link} from 'react-router-dom';

const SelectView = () => (
  <div className={styles.container}>
    <Link to="/home">
      <BigBlackButton
      innerText="View Team" />
    </Link>
    <Link to="/home">
      <BigRedButton
      innerText="Leave Feedback" />
    </Link>
  </div>
);

SelectView.displayName = 'SelectView';
export default SelectView;
