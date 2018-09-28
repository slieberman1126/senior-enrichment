import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Student from './Student';
import { connect } from 'react-redux';

const Students = ({ students }) => {
  return (
    <div>
      <h3>Students</h3>

      {students.map(student => (
        <div
          className="single-student"
          key={student.id}
          id={student.id}
          student={student}
        >
          <Link to={`/students/${student.id}`}>
            {student.firstName} {student.gpa}
          </Link>
        </div>
      ))}
      <Link to="/students/create">
        <button>New Student</button>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ students }) => {
  return {
    students,
  };
};

export default connect(mapStateToProps)(Students);
