import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

class Students extends Component {
  render() {
    const { students, schools } = this.props;

    return (
      <div>
        <h1>Students</h1>

        <ul>
          {students.map(student => {
            const schoolsStudents = schools.find(
              school => school.id === student.schoolId
            );
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <Link to={`/schools/${student.schoolId}`}>
                  {schoolsStudents ? schoolsStudents.name : 'none'}
                </Link>
                <button onClick={() => this.props.deleteStudent(student)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>

        <Link to="/students/create">
          <button>Create Student</button>
        </Link>
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
    deleteStudent: student => dispatch(deleteStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
