import React from 'react';
import styles from './elements.css';

const SelectButton = (props) => (
  <section>
    <button className={styles.smallButton__black} onClick={props.submit}>✓</button>
    <button className={`${styles.smallButton__black} ${styles.red}`} onClick={props.toggle}>{props.leftSymbol}</button>
  </section>
);

SelectButton.displyName = 'SelectButton';
export default SelectButton;
