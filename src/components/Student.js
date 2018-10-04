import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent } from '../store';

class Student extends Component {
  constructor(props) {
    super(props);
    const student = this.props.student;
    this.state = {
      firstName: student ? student.firstName : '',
      lastName: student ? student.lastName : '',
      gpa: student ? student.gpa : '',
      schoolId: student ? student.schoolId : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.student && this.props.student) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        gpa: this.props.student.gpa,
        schoolId: this.props.student.schoolId,
      });
    }
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props
      .updateStudent({
        id: this.props.student.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gpa: this.state.gpa,
        schoolId: this.state.schoolId,
      })
      .then(() => this.props.history.push('/students/'));
  }

  render() {
    if (!this.props.student) {
      return null;
    }
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { onChange, onSave } = this;
    const { schools, student } = this.props;
    const empty = !firstName || !lastName || !gpa;
    const changed =
      this.props.student.firstName !== firstName ||
      this.props.student.lastName !== lastName ||
      this.props.student.gpa !== gpa ||
      this.props.student.schoolId !== schoolId;
    return (
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <form onSubmit={onSave}>
          <div>
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
            <input
              type="number"
              name="gpa"
              step="0.1"
              min="1"
              max="4"
              value={gpa}
              onChange={onChange}
            />
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

          <button type="submit" disabled={empty || !changed}>
            Update
          </button>
          <button
            type="delete"
            onClick={() => this.props.deleteStudent(student)}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ schools, students }, { match, history }) => {
  const student = students.find(s => s.id === match.params.id * 1);
  return {
    student,
    schools,
    students,
    history,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateStudent: student => dispatch(updateStudent(student, history)),
    deleteStudent: student => dispatch(deleteStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
