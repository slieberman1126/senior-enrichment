import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSchool, updateStudent } from '../store';
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
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.school && this.props.school) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description,
      });
    }
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props.updateSchool({
      id: this.props.school.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    });
    this.props.history.push('/schools');
  }
  handleUnenroll(student) {
    const update = { ...student, schoolId: null };
    this.props.updateStudent(update);
  }

  render() {
    if (!this.props.school) {
      return null;
    }
    const { school } = this.props;
    const { name, address, description } = this.state;
    const { onChange, onSave, handleUnenroll } = this;
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
            </div>
          </form>
        </div>
        <div>
          <h4>Students Enrolled:</h4>
        </div>
        <div>
          {school.students.map(student => (
            <li key={student.id}>
              {student.firstName} {student.lastName}
              <button className="btn" onClick={() => handleUnenroll(student)}>
                Unenroll
              </button>
            </li>
          ))}
        </div>
        <div>
          <Link to="/students/create/">
            <button>Add Student</button>
          </Link>
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateSchool: school => dispatch(updateSchool(school)),
    updateStudent: student => dispatch(updateStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
