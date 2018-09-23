import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Student from './Student';

const StudentList = ({ students }) => {
  if (!students.length) {
    return (
      <div>
        <h1>There are no students</h1>
        <Link to="/create">
          <button className="btn">Add Student</button>
        </Link>
      </div>
    );
  }
};
