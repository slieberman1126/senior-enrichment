import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { deleteSchool, updateSchool } from '../store';
class School extends Component {
  constructor({ school, id }) {
    super();
    /*this.state = {
      name: props.school.name,
      address: props.school.address,
      description: props.school.description,
    };*/
  }

  render() {
    return (
      <div>
        <h3>{this.props.school.name}</h3>
        <div>
          <form>
            <div>
              <div>
                <label>Name:</label>
                <input name="name" value={this.props.school.name} />
              </div>
              <div>
                <label>Address:</label>
                <input name="address" value={this.props.school.address} />
              </div>
              <div>
                <label>Description:</label>
                <input
                  name="description"
                  value={this.props.school.description}
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ schools }, { match, history }) => {
  const school = schools.find(school => school.id === match.params.id * 1);
  return {
    school: school.schools,
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
