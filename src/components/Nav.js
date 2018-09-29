import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ students, schools }) => {
  return (
    <div>
      <Link to="/students">
        <h3>Students ({students.length})</h3>
      </Link>

      <Link to="/schools">
        <h3>Schools ({schools.length})</h3>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ students, schools }) => {
  return {
    students,
    schools,
  };
};

export default connect(mapStateToProps)(Nav);
