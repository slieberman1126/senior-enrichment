import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSchool } from '../store';

class Schools extends Component {
  render() {
    const { schools, students } = this.props;

    return (
      <div>
        <h1>
          Schools ({schools.length}) Students ({students.length})
        </h1>

        <ul>
          {schools.map(school => {
            const studentsSchools = students.filter(
              student => student.schoolId === school.id
            );
            return (
              <li key={school.id}>
                <Link to={`/schools/${school.id}`}>{school.name}</Link>(
                {studentsSchools.length})
                <button
                  className="btn"
                  onClick={() => this.props.deleteSchool(school)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>

        <Link to="/schools/create">
          <button>Create School</button>
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
    deleteSchool: school => dispatch(deleteSchool(school)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schools);
