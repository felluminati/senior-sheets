import React from 'react';
import styles from './index.css';
import {BigRedButton, BigBlackButton} from '../elements';
import {Link} from 'react-router-dom';

const SelectView = (props) => (
  <section className={styles.choiceWrapper}>
    <Link to={`/feedback/view/${props.teamId}`}>
      <BigBlackButton
      innerText="View Team" />
    </Link>
    <Link to={`/feedback/add/${props.teamId}`}>
      <BigRedButton
      innerText="Leave Feedback" />
    </Link>
  </section>
);

SelectView.displayName = 'SelectView';
export default SelectView;
