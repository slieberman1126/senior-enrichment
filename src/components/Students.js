import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

class Students extends Component {
  render() {
    const { schools, students } = this.props;
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
                <button
                  className="btn"
                  onClick={() => deleteStudent(student.id)}
                >
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
    deleteStudent: id => dispatch(deleteStudent(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
