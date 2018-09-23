import axios from 'axios';

const GET_STUDENT = 'GET_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const _getStudent = student => {
  return {
    type: GET_STUDENT,
    student,
  };
};
const _createStudent = student => {
  return {
    type: CREATE_STUDENT,
    student,
  };
};
const _getStudents = students => {
  return {
    type: GET_STUDENTS,
    students,
  };
};
const _deleteStudent = id => {
  return {
    type: DELETE_STUDENT,
    id,
  };
};
const _updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};
export const getStudent = id => {
  return dispatch => {
    return axios
      .get(`/api/students/${id}`)
      .then(response => response.data)
      .then(student => dispatch(_getStudent(student)))
      .catch(error => console.error(error));
  };
};
export const getStudents = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(response => response.data)
      .then(students => dispatch(_getStudents(students)))
      .catch(error => console.error(error));
  };
};
export const postStudent = student => {
  return dispatch => {
    return axios
      .post('/api/students', student)
      .then(response => response.data)
      .then(newStudent => dispatch(_createStudent(newStudent)))
      .catch(error => console.log(error));
  };
};
export const deleteStudent = (student, history) => {
  return dispatch => {
    return axios
      .delete(`/api/students/${student.id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteStudent(student)))
      .then(() => history && history.push('/students'))
      .catch(error => console.log(error));
  };
};
export const updateStudent = (student, update, history) => {
  return dispatch => {
    return axios
      .put(`/api/students/${student.id}`, update)
      .then(response => response.data)
      .then(updatedStudent => dispatch(_updateStudent(updatedStudent)))
      .then(() => history.push(`/schools/${student.id}`))
      .catch(error => console.log(error));
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_STUDENT:
      return [...state, action.student];
    case GET_STUDENTS:
      return action.students;
    case GET_STUDENT:
      return [...state, action.student];
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id);
    case UPDATE_STUDENT:
      return state.map(
        student => (student.id === action.student.id ? action.student : student)
      );
    default:
      return state;
  }
};

export default reducer;
