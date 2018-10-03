import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSchool, updateStudent, deleteSchool } from '../store';
import { Link } from 'react-router-dom';

class School extends Component {
  constructor(props) {
    super(props);
    const school = this.props.school;

    this.state = {
      name: school ? school.name : '',
      address: school ? school.address : '',
      description: school ? school.description : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleUnenroll = this.handleUnenroll.bind(this);
    this.handleEnroll = this.handleEnroll.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.school && this.props.school) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description,
        schoolId: this.props.student.schoolId,
      });
    }
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props
      .updateSchool({
        id: this.props.school.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
      })
      .then(() => this.props.history.push('/schools/'));
  }
  handleUnenroll(student, school) {
    this.props
      .updateStudent({ ...student, schoolId: null })
      .then(() => this.props.history.push(`/schools/${school.id}`));
  }
  handleEnroll(student, school) {
    this.props
      .updateStudent({ ...student, schoolId: school.id })
      .then(() => this.props.history.push(`/schools/${school.id}`));
  }

  render() {
    if (!this.props.school) {
      return null;
    }
    const { students, school } = this.props;
    const { name, address, description } = this.state;
    const { onChange, onSave, handleUnenroll, handleEnroll } = this;
    const findEnrolled = students.filter(
      student => student.schoolId === school.id
    );
    const findUnenrolled = students.filter(
      student => student.schoolId !== school.id
    );
    const empty = !name || !address || !description;
    const changed =
      this.props.school.name !== name ||
      this.props.school.address !== address ||
      this.props.school.description !== description;
    return (
      <div>
        <h3>{name}</h3>
        <div>
          <form onSubmit={onSave}>
            <div>
              <div>
                <label>Name:</label>
                <input id="name" name="name" value={name} onChange={onChange} />
              </div>
              <div>
                <label>Address:</label>
                <input
                  id="address"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </div>
              <button disabled={empty || !changed}>Update</button>
              <button
                className="btn"
                onClick={() => this.props.deleteSchool(school)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        <div>
          <h4>Students Enrolled:</h4>
        </div>
        <div>
          {findEnrolled.map(enrolled => {
            return (
              <li key={enrolled.id}>
                <Link to={`/students/${enrolled.id}`}>
                  {enrolled.firstName} {enrolled.lastName}
                </Link>
                <button
                  className="btn"
                  onClick={() => handleUnenroll(enrolled, school)}
                >
                  Unenroll
                </button>
              </li>
            );
          })}
        </div>
        <div>
          <h4>Students Not enrolled:</h4>
        </div>
        <div>
          {findUnenrolled.map(enrolled => {
            return (
              <li key={enrolled.id}>
                <Link to={`/students/${enrolled.id}`}>
                  {enrolled.firstName} {enrolled.lastName}
                </Link>
                <button
                  className="btn"
                  onClick={() => handleEnroll(enrolled, school)}
                >
                  Enroll
                </button>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ schools, students }, { match, history }) => {
  const school = schools.find(s => s.id === match.params.id * 1);
  return {
    school,
    students,
    history,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateSchool: school => dispatch(updateSchool(school, history)),
    updateStudent: student => dispatch(updateStudent(student, history)),
    deleteSchool: school => dispatch(deleteSchool(school)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
