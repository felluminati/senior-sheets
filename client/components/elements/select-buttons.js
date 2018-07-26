import React from 'react';
import styles from './elements.css';

const SelectButton = (props) => (
  <section>
    { !!props.submit && <button className={styles.smallButton__black} onClick={props.submit}>✓</button>}
    <button className={`${styles.smallButton__black} ${styles.red}`} onClick={props.toggle}>{props.rightSymbol}</button>
  </section>
);

SelectButton.displyName = 'SelectButton';
export default SelectButton;
