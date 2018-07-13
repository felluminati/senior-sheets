import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCohort} from '../../store';


class AddForm extends Component {
  displayname = 'AddForm';
  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    this.props.addNewCohort(this.state.input);
    this.props.showAddForm();
  }

  render () {
    return (
      <div className="main__selectOrAdd">
        <input autoFocus className="main__input" onChange={this.handleChange} value={this.state.input} />
        <button className="main__button" onClick={this.handleSubmit}>✓</button>
        <button className="main__button main__addButton" onClick={this.props.showAddForm}>x</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cohorts: state.cohorts,
});
const mapDispatch = (dispatch) => ({
  addNewCohort: (name) => {
    dispatch(postCohort(name));
  }
});

export default connect(mapState, mapDispatch)(AddForm);
