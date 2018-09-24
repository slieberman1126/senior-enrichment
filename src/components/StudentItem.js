import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from '../store';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addSchool = this.bind(this);
  }
  deleteStudent() {
    this.props.deleteStudent(this.props.student.id);
  }
  updateStudent(stateProps) {
    const student = Object.assign({}, this.props.student, stateProps);
    this.props.updateStudent(student);
  }
  addSchool(school) {
    const student = Object.assign({}, this.props.student, {
      schoolId: school.id,
    });
    this.props.updateStudent(student);
  }
  render() {
    const { deleteStudent, updateStudent, addSchool } = this;
    const { student } = this.props;

    return (
      <div className="single-student">
        <h1>
          {student.firstName} {student.lastName}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    student: state.student,
  };
};

export default connect(mapStateToProps)(Student);
