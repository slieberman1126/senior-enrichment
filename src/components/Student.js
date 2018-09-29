import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
class Student extends Component {
  constructor({ student }) {
    super();

    this.state = {
      firstName: student ? student.firstName : '',
      lastName: student ? student.lastName : '',
      gpa: student ? student.gpa : '',
      schoolId: student ? student.schoolId : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.student && this.props.student) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        gpa: this.props.student.gpa,
        schoolId: this.props.student.schoolId,
      });
    }
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props.updateStudent({
      id: this.props.student.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa,
      schoolId: this.state.schoolId,
    });
    this.props.history.push('/students');
  }

  render() {
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { onChange, onSave } = this;
    const { schools } = this.props;
    const empty = !firstName || !lastName || !gpa;
    const changed =
      this.props.student.firstName !== firstName ||
      this.props.student.lastName !== lastName ||
      this.props.student.gpa !== gpa ||
      this.props.student.schoolId !== schoolId;
    return (
      <div>
        <h1>Add a Student</h1>
        <Container>
          <Form onSubmit={onSave}>
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

            <Button type="submit" disabled={empty || !changed}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { match, history }) => {
  const student = students.find(student => student.id === match.params.id * 1);
  return {
    student,

    students,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateStudent: student => dispatch(updateStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
