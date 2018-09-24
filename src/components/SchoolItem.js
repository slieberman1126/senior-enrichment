import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSchool, updateStudent } from '../store';
class SchoolItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }
  onChange(evt){

  }


  render() {
    const { history } = this.props;
    return (
        <div className='single-school'>
        
    )
 
    }
  }
}

const mapStateToProps = ({ students, schools }, { id }) => {
  const _students = students.filter(student => student.schoolId === id);
  const studentNotEnrolled = students.filter(
    student => student.schoolId !== id
  );
  const school = schools.find(school => school.id === id);

  return {
    school: school,
    schools: schools,
    studentNotEnrolled: studentNotEnrolled,
    students: _students,
    allStudents: students,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateStudent: student => dispatch(updateStudent(student, history)),
    deleteSchool: school => dispatch(deleteSchool(school.id, history)),
    // saveStudents: (students) => dispatch(saveStudents(students, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolItem);
