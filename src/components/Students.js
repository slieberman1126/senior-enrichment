import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

class Students extends Component {
  render() {
    const { students, deleteStudent } = this.props;
    return (
      <div>
        <h1>Students</h1>

        <ul>
          {students.map(student => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName} {student.gpa}
                </Link>
                <span>
                  <Link to={`/schools/${student.schoolId}`}>
                    {this.props.matchSchool(student.schoolId)}
                  </Link>
                </span>
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

const mapStateToProps = ({ students, schools }) => {
  const matchSchool = schoolId => {
    const school = schools.find(school => {
      return school.id === schoolId;
    });
    return school.name;
  };
  return {
    students,
    schools,
    matchSchool,
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
