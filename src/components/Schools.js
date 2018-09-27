import React, { Component } from 'react';
import { Link, HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSchool, createSchool, getSchools } from '../store';

class Schools extends Component {
  render() {
    const { schools, deleteSchool } = this.props;

    return (
      <div>
        <h1>Schools</h1>

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
      </div>
    );
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools: schools.schools,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteSchool: id => dispatch(deleteSchool(id, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schools);
/*
        <div>
          <form>
            <div>
              <label htmlFor="schoolName">Name: </label>
              <input
                id="schoolName"
                value={name}
                onChange={handleChange}
                type="text"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="schoolAddress">Address: </label>
              <input
                id="schoolAddress"
                value={address}
                onChange={handleChange}
                type="text"
                name="address"
              />
            </div>
            <div>
              <label htmlFor="schoolDescription">Description: </label>
              <input
                id="schoolDescription"
                value={description}
                onChange={handleChange}
                type="text"
                name="description"
              />
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
        */
