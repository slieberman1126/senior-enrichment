import axios from 'axios';

const GET_SCHOOLS = 'GET_SCHOOLS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

const _getSchools = schools => {
  return {
    type: GET_SCHOOLS,
    schools,
  };
};
export const _createSchool = school => {
  return {
    type: CREATE_SCHOOL,
    school,
  };
};
const _deleteSchool = id => {
  return {
    type: DELETE_SCHOOL,
    id,
  };
};
const _updateSchool = name => {
  return {
    type: UPDATE_SCHOOL,
    name,
  };
};
export const getSchools = () => {
  return dispatch => {
    return axios
      .get('/api/schools')
      .then(response => response.data)
      .then(schools => dispatch(_getSchools(schools)))
      .catch(error => console.log(error));
  };
};

export const postSchool = school => {
  return dispatch => {
    return axios
      .post('/api/schools', school)
      .then(response => response.data)
      .then(newSchool => dispatch(_createSchool(newSchool)))
      .catch(error => console.log(error));
  };
};
export const deleteSchool = (school, history) => {
  return dispatch => {
    return axios
      .delete(`/api/schools/${school.id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteSchool(school)))
      .then(() => history && history.push('/schools'))
      .catch(error => console.log(error));
  };
};
export const updateSchool = (school, update, history) => {
  return dispatch => {
    return axios
      .put(`/api/schools/${school.id}`, update)
      .then(response => response.data)
      .then(updatedSchool => dispatch(_updateSchool(updatedSchool)))
      .then(() => history.push(`/schools/${school.id}`))
      .catch(error => console.log(error));
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      return action.schools;
    case CREATE_SCHOOL:
      return [...state, action.school];
    case DELETE_SCHOOL:
      return state.filter(school => school.id !== action.school.id);
    case UPDATE_SCHOOL:
      return state.map(
        school => (school.id === action.school.id ? action.school : school)
      );
    default:
      return state;
  }
};

export default reducer;
