import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postSchool, _createSchool } from '../store';

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
  handleSubmit(evt) {
    evt.preventDefault();
    const { name, address, description } = this.state;
    this.props.postSchool({ name, address, description });
  }
  handleChange(evt) {
    this.props._createSchool(evt.target.value);
  }
  render() {
    const { name, address, description } = this.state;
    return (
      <div>
        <h1>Add a School</h1>
        <form id="new-school-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    name: state.name,
    address: state.address,
    description: state.description,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postSchool: school => dispatch(postSchool(school)),
    _createSchool: school => dispatch(_createSchool(school)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolForm);
