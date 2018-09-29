import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// Students action types
const CREATE_STUDENT = 'CREATE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//Schools action types
const GET_SCHOOLS = 'GET_SCHOOLS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

// Students action creators

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
    student: { id },
  };
};
const _updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};

// School action creators
const _getSchools = schools => {
  return {
    type: GET_SCHOOLS,
    schools,
  };
};
const _createSchool = school => {
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
const _updateSchool = school => {
  return {
    type: UPDATE_SCHOOL,
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
export const deleteStudent = id => {
  return dispatch => {
    return axios
      .delete(`/api/students/${id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteStudent(id)))
      .catch(error => console.log(error));
  };
};
export const updateStudent = student => {
  return dispatch => {
    return axios
      .put(`/api/students/${student.id}`, student)
      .then(response => response.data)
      .then(updatedStudent => dispatch(_updateStudent(updatedStudent)))
      .catch(error => console.log(error));
  };
};

//School thunks

export const getSchools = () => {
  return dispatch => {
    axios
      .get('/api/schools')
      .then(response => response.data)
      .then(schools => dispatch(_getSchools(schools)))
      .catch(error => console.log(error));
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
export const deleteSchool = id => {
  return dispatch => {
    return axios
      .delete(`/api/schools/${id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteSchool(id)))
      .catch(error => console.log(error));
  };
};
export const updateSchool = school => {
  return dispatch => {
    return axios
      .put(`/api/schools/${school.id}`, school)
      .then(response => response.data)
      .then(school => dispatch(_updateSchool(school)))
      .catch(error => console.log(error));
  };
};
// initial states

//   student reducer
const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_STUDENT:
      return [...state, action.student];
    case GET_STUDENTS:
      return action.students;
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id);
    case UPDATE_STUDENT:
      return state.map(
        student => (student.id !== action.student.id ? student : action.student)
      );
    default:
      return state;
  }
};

//school reducer
const schoolsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      return action.schools;
    case CREATE_SCHOOL:
      return [...state, action.school];
    case DELETE_SCHOOL:
      return state.filter(school => school.id !== action.school.id);
    case UPDATE_SCHOOL:
      return state.map(
        school => (school.id !== action.school.id ? school : action.school)
      );
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
