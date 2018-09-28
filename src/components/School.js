import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { deleteSchool, updateSchool } from '../store';
const School = ({ school, deleteSchool }) => {
  if (!school) {
    return null;
  }

  return (
    <div>
      <h3>{school.name}</h3>
      <div>
        <form>
          <div>
            <div>
              <label>Name:</label>
              <input name="name" value={school.name} />
            </div>
            <div>
              <label>Address:</label>
              <input name="address" value={school.address} />
            </div>
            <div>
              <label>Description:</label>
              <input name="description" value={school.description} />
            </div>
          </div>
        </form>
      </div>
      <div>
        <button>Save</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ schools }, { match, history }) => {
  const school = schools.find(school => school.id === match.params.id * 1);
  return {
    school,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleSave: school => dispatch(saveSchool(school)),
    getSchool: id => dispatch(getSchool(id)),
    handleChange: school => dispatch(_updateSchool(school)),
    deleteSchool: school => dispatch(deleteSchool(school)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
