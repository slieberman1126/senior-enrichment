import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// Students action types
const GET_STUDENT = 'GET_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//Schools action types
const GET_SCHOOLS = 'GET_SCHOOLS';
const GET_SCHOOL = 'GET_SCHOOL';
const SAVE_SCHOOL = 'SAVE_SCHOOL';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

// Students action creators

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

// School action creators
const _getSchools = schools => ({ type: GET_SCHOOLS, schools });
export const _createSchool = school => {
  return {
    type: CREATE_SCHOOL,
    school,
  };
};
const _deleteSchool = id => {
  return {
    type: DELETE_SCHOOL,
    school: { id },
  };
};
export const _updateSchool = name => {
  return {
    type: UPDATE_SCHOOL,
    name,
  };
};
const _getSchool = id => {
  return {
    type: GET_SCHOOL,
    id,
  };
};
const _saveSchool = school => {
  return {
    type: SAVE_SCHOOL,
    school,
  };
};
// General thunks

export const loadAll = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(response => response.data)
      .then(students => dispatch(_getStudents(students)))
      .then(() => {
        axios
          .get('/api/schools')
          .then(response => response.data)
          .then(schools => dispatch(_getSchools(schools)));
      });
  };
};
// Student thunks

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
export const createStudent = student => {
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
      .then(() => history.push('/students'))
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

//School thunks
export const getSchool = id => {
  return dispatch => {
    return axios
      .get(`/api/schools/${id}`)
      .then(response => response.data)
      .then(school => dispatch(_getStudent(school)))
      .catch(error => console.error(error));
  };
};

export const getSchools = () => {
  return dispatch => {
    axios
      .get('/api/schools')
      .then(response => dispatch(_getSchools(response.data)));
  };
};
export const createSchool = school => {
  return dispatch => {
    return axios
      .post('/api/schools', school)
      .then(response => response.data)
      .then(newSchool => dispatch(_createSchool(newSchool)))
      .catch(error => console.log(error));
  };
};
export const deleteSchool = (id, history) => {
  return dispatch => {
    return axios
      .delete(`/api/schools/${id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteSchool(id)))
      .then(() => history.push('/schools'))
      .catch(error => console.log(error));
  };
};
export const saveSchool = school => {
  return dispatch => {
    return axios
      .put(`/api/schools/${school.id}`, school)
      .then(response => response.data)
      .then(savedSchool => dispatch(_saveSchool(savedSchool)))
      .catch(error => console.log(error));
  };
};
// initial states
const studentsInitialState = {
  students: [],
  student: {},
};
const schoolsInitialState = {
  schools: [],
  school: {},
};
//   student reducer
const studentsReducer = (state = studentsInitialState, action) => {
  switch (action.type) {
    case CREATE_STUDENT:
      return { ...state, studentss: [...state.students, action.student] };
    case GET_STUDENTS:
      return { ...state, students: action.students };
    case GET_STUDENT:
      return { ...state, student: action.student };
    case DELETE_STUDENT:
      const students = state.students.filter(
        student => student.id !== action.student.id
      );
      return { ...state, students };
    case UPDATE_STUDENT:
      return { ...state, student: action.student };
    default:
      return state;
  }
};

//school reducer
const schoolsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHOOL:
      return { ...state, school: action.school };
    case GET_SCHOOLS:
      return action.schools;
    case SAVE_SCHOOL:
      const filter = state.schools.filter(
        school => school.id !== action.school.id
      );
      return { ...state, schools: [...filter, action.school] };
    case CREATE_SCHOOL:
      return [...state, action.school];
    case DELETE_SCHOOL:
      const schools = state.schools.filter(
        school => school.id !== action.school.id
      );
      return { ...state, schools };
    case UPDATE_SCHOOL:
      return { ...state, school: action.school };
    default:
      return state;
  }
};

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
