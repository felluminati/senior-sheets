import React from 'react';
import styles from './elements.css';

const BigBlackButton = (props) => {
  return (
    <button
      className={styles.largeButton__black}
      onClick={props.clickHandler}
      name={props.name}>
      {props.innerText}
    </button>
  );
};

BigBlackButton.displayName = 'BigBlackButton';
export default BigBlackButton;
