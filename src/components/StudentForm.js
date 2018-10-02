import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.schoolId) {
      this.setState({ schoolId: this.props.schoolId });
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const gpa = this.state.gpa;
    const schoolId = this.state.schoolId;
    this.props
      .createStudent({
        firstName,
        lastName,
        gpa,
        schoolId,
      })
      .then(() => this.props.history.push('/students'));
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { handleSubmit, onChange } = this;
    const { schools } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    return (
      <div>
        <h1>Add a Student</h1>
        <form id="new-school-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gpa">GPA:</label>
            <input type="number" name="gpa" value={gpa} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="schoolId">School:</label>
            <select
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={onChange}
            >
              <option value="">none</option>
              {schools.map(school => {
                return (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit" disabled={!firstName || !lastName || !gpa}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentForm);
