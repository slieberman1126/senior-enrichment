import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent, deleteStudent } from '../store';

class Student extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({ value: evt.target.value });
  }
  render() {
    const { student, schools, updateStudent, deleteStudent } = this.props;
    const school = schools.find(school => school.id === student.schoolId);
    return (
      <div>
        <h1>
          {student.firstName} {student.lastName}
        </h1>
        <h2>GPA: {student.gpa}</h2>
        <div className="edit-student">
          Link to edit student
          <button className="delete" onClick={() => deleteStudent(student)}>
            x
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ students }, { id }) => {
  const student = students.find(student => student.id === id);
  return {
    student,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteStudent: student => dispatch(deleteStudent(student, history)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
