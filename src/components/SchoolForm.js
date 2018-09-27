import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSchool } from '../store';

class SchoolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    this.props.addSchool(this.state);
    this.props.history.push('/schools');
  }
  handleChange(evt) {
    evt.preventDefault();
    this.setState({ [evt.target.name]: [evt.target.value] });
  }
  render() {
    const { name, address, description } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Add a School</h1>
        <form id="new-school-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSchool: school => dispatch(createSchool(school)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SchoolForm);
