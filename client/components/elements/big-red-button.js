import React from 'react';
import styles from './elements.css';

const BigRedButton = (props) => {
  return (
    <button
      className={`${styles.largeButton__black} ${styles.red}`}
      onClick={props.clickHandler}
      name={props.name}
      type={props.type}>
      {props.innerText}
    </button>
  );
};

BigRedButton.displayName = 'BigRedButton';
export default BigRedButton;
