import React from 'react';
import { Link } from 'react-router-dom';
import StudentItem from './StudentItem';
import { connect } from 'react-redux';

const Students = ({ students }) => {
  return (
    <div>
      <h3>Students</h3>

      {students.map(student => (
        <div className="single-student" key={student.id}>
          <Link to={`/students/${student.id}`}>
            <h3>
              {student.firstName} {student.gpa}
            </h3>
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
