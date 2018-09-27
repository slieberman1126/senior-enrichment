import React from 'react';

import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from '../store';

const Student = ({ student, _deleteStudent }) => {
  if (!student) {
    return null;
  }
  return (
    <div>
      <h3>First Name: {student.firstName}</h3>
      <h3>Last Name: {student.lastName}</h3>
      {student.school ? <h3>School: {student.school.name}</h3> : ''}
      <h3>GPA: {student.gpa}</h3>
      <button type="delete" onClick={() => _deleteStudent(student)}>
        Delete
      </button>
    </div>
  );
};
const mapStateToProps = ({ students }, { id }) => {
  const student = students.find(id => id.id === id);
  return {
    student,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    _deleteStudent: student => dispatch(deleteStudent(student, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
