import React from 'react';
import styles from './elements.css';

const LilBlackButton = (props) => {
  return (
    <button
      className={`${styles.smallButton__black} ${styles.lil__black}`}
      onClick={props.clickHandler}
      name={props.name}>
      {props.innerText}
    </button>
  );
};

LilBlackButton.displayName = 'LilBlackButton';
export default LilBlackButton;
