import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSchool } from '../store';

class Schools extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { schools, deleteSchool, students } = this.props;
    return (
      <div>
        <h1>
          Schools ({schools.length}) Students ({students.length})
        </h1>

        <ul>
          {schools.map(school => {
            return (
              <li key={school.id}>
                <Link to={`/schools/${school.id}`}>{school.name}</Link>(
                {school.students.length})
                <button className="btn" onClick={() => deleteSchool(school.id)}>
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
    deleteSchool: id => dispatch(deleteSchool(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schools);
