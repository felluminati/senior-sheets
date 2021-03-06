import React from 'react';
import styles from './elements.css';

const LilRedButton = (props) => {
  return (
    <button
      className={`${styles.smallButton__black} ${styles.lil__red}`}
      onClick={props.clickHandler}
      name={props.name}>
      {props.innerText}
    </button>
  );
};

LilRedButton.displayName = 'LilRedButton';
export default LilRedButton;
