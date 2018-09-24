import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SchoolItem from './SchoolItem';
import SchoolForm from './SchoolForm';
import { deleteSchool } from '../store';

/*const Schools = ({ schools, students, del }) => {
  if (!schools.length) {
    return (
      <div className="empty-message">
        <h2>There are no schools in the database.</h2>
        <Link to="/create-school">
          <button className="btn btn-outline-primary">Add School</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>All Schools</h1>
        <Link to="/create-school">
          <button className="btn btn-outline-primary">Add School</button>
        </Link>
      </div>
      <div className="row justify-content-center">
        <SchoolItem schoold={schools} students={students} del={del} />
      </div>
    </div>
  );
};

const mapState = state => ({
  schools: state.schools,
  students: state.students,
});

const mapDispatch = dispatch => ({
  del(id) {
    dispatch(deleteSchool(id));
  },
});

export default connect(
  mapState,
  mapDispatch
)(Schools);
*/
const Schools = ({ schools }) => {
  return (
    <div>
      <h3>Schools</h3>
      <ul>
        {schools.map(school => (
          <Link to={`/schools/${school.id}`} key={school.id}>
            <h3>
              {school.name} {school.students.length}
            </h3>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ schools }) => {
  return {
    schools,
  };
};

export default connect(mapStateToProps)(Schools);
