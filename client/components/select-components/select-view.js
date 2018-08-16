import React from 'react';
import styles from './index.css';
import {BigRedButton, BigBlackButton} from '../elements';
import {Link} from 'react-router-dom';

const SelectView = (props) => (
  <section className={styles.choiceWrapper}>
    <Link to={`/feedback/${props.cohort}/${props.project}/${props.teamId}/view`}>
      <BigBlackButton
      innerText="View Team" />
    </Link>
    <Link to={`/feedback/${props.cohort}/${props.project}/${props.teamId}/add`}>
      <BigRedButton
      innerText="Leave Feedback" />
    </Link>
  </section>
);

SelectView.displayName = 'SelectView';
export default SelectView;
