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
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const address = evt.target.address.value;
    const description = evt.target.description.value;
    this.props
      .createSchool({ name, address, description })
      .then(() => this.props.history.push('/schools'));
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { handleSubmit, onChange } = this;
    const { name, address, description } = this.state;
    return (
      <div>
        <h1>Add a School</h1>
        <form id="new-school-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={name} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>

          <button type="submit" disabled={!name || !address || !description}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSchool: school => dispatch(createSchool(school)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SchoolForm);
