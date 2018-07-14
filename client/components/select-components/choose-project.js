import React from 'react';
import {connect} from 'react-redux';
import styles from './index.css';
import {selectProject} from '../../store';
import {BigBlackButton, BigRedButton} from '../elements';

const ChooseProject = (props) => (
  <div className={styles.container}>
    <BigBlackButton
    name="graceShopper"
    clickHandler={props.handleSelect}
    innerText="Grace Shopper"
    />
    <BigRedButton
    name="capstone"
    clickHandler={props.handleSelect}
    innerText="Capstone"
    />
  </div>
);

const mapState = (state) => ({
  project: state.project,
});
const mapDispatch = (dispatch) => ({
  handleSelect: (event) => {
    dispatch(selectProject(event.target.name));
  }
});

export default connect(mapState, mapDispatch)(ChooseProject);
