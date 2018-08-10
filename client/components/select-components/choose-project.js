import React from 'react';
import styles from './index.css';
import {BigBlackButton, BigRedButton, Title} from '../elements';

const ChooseProject = (props) => (
  <section className={styles.choiceWrapper}>
    <Title>Select Project</Title>
    <section className={styles.container}>
      <BigBlackButton
      name="graceShopper"
      clickHandler={() => props.handleSelect('graceShopper', 'project')}
      innerText="Grace Shopper"
      />
      <BigRedButton
      name="capstone"
      clickHandler={() => props.handleSelect('capstone', 'project')}
      innerText="Capstone"
      />
    </section>
  </section>
);

export default ChooseProject;
