import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/*class Nav extends Component {
  render() {
    const { schools, students } = this.props;
    return (
      <ul>
        <li className="nav-item">
          <Link className="nav-link" to="/schools">
            Schools ({schools.length})
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/students">
            Students ({students.length})
          </Link>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    schools: state.schools,
    students: state.students,
  };
};
export default connect(mapStateToProps)(Nav);
*/

const Nav = ({ students, schools }) => {
  return (
    <div>
      <Link to="/students">
        {' '}
        <button>Students ({students.length})</button>{' '}
      </Link>

      <Link to="/schools">
        {' '}
        <button>Schools ({schools.length})</button>{' '}
      </Link>
    </div>
  );
};

const mapStateToProps = ({ students, schools }) => {
  return {
    students,
    schools,
  };
};

export default connect(mapStateToProps)(Nav);
