import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ students, schools }) => {
  return (
    /*<ul>
      <li>
        <Link to="/schools">Schools ({schools.length})</Link>
      </li>
      <li>
        <Link to="/students">Students ({students.length})</Link>
      </li>
    </ul>*/
    <div>
      <button>Students</button>
      <button>Schools</button>
    </div>
  );
};
export default Nav;
