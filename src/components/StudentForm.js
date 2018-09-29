import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createStudent } from '../store';

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const gpa = evt.target.gpa.value;
    const schoolId = evt.target.schoolId.value;
    this.props
      .createStudent({
        firstName,
        lastName,
        gpa,
        schoolId,
      })
      .then(() => this.props.history.push('/students'));
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { handleSubmit, onChange } = this;
    const { schools } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    return (
      <div>
        <h1>Add a Student</h1>
        <Container>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="first">First Name:</Label>
              <Input
                id="first"
                type="text"
                name="first"
                value={firstName}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="last">Last Name:</Label>
              <Input
                id="last"
                type="text"
                name="last"
                value={lastName}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gpa">GPA: </Label>
              <Input
                id="gpa"
                type="number"
                name="gpa"
                value={gpa}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="schoolId">School:</Label>
              <Input
                id="schoolId"
                value={schoolId}
                onChange={onChange}
                type="select"
                name="schoolId"
              >
                <option>None</option>
                {schools.map(school => {
                  return (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>

            <Button type="submit" disabled={!firstName || !lastName || !gpa}>
              Submit
            </Button>
          </Form>
        </Container>
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
    createStudent: student => dispatch(createStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentForm);
