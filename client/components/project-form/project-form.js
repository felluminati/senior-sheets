import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './project-form.css';

class ProjectForm extends Component {
  displayName = ProjectForm;
  state = {
    input: '',
    showAddForm: false,
  }
  handleAddChange = (event) => {
    this.setState({input: event.target.value});
  }
  showAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }
  handleSubmit = (event) => {
    console.log(this.state.input);
    this.showAddForm();
  }
  render () {
    const {formType} = this.props;
    return (
      <div className={styles.projectForm__container}>
        <div className={styles.projectForm__title}>
          {!this.state.showAddForm ? `Choose ${formType}: ` : `Add ${formType}: `}
        </div>
        {!this.state.showAddForm ?
        <div className={styles.projectForm__selectOrAdd}>
          <select className={styles.projectForm__input} >
            <option>1806</option>
            <option>1808</option>
          </select>
          <button className={styles.projectForm__button} onClick={this.showAddForm}>✓</button>
          <button className={`${styles.projectForm__button} ${styles.projectForm__addButton}`} onClick={this.showAddForm}>+</button>
        </div>
        :
          <div className={styles.projectForm__selectOrAdd}>
          <input autoFocus className={styles.projectForm__input} onChange={this.handleAddChange} value={this.state.input} />
          <button className={styles.projectForm__addButton} onClick={this.handleSubmit}>+</button>
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({

});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProjectForm);
