import React, { Component } from 'react';
import store, { loadAll } from '../store';

import { HashRouter as Router, Route } from 'react-router-dom';
import Schools from './Schools';
import Students from './Students';
import School from './School';
import Student from './Student';
import SchoolForm from './SchoolForm';
import StudentForm from './StudentForm';
import Nav from './Nav';
import { connect } from 'react-redux';

class Main extends Component {
  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route component={Nav} />

            <Route
              path="/school/create"
              render={({ history }) => <SchoolForm history={history} />}
            />
            <Route path="/students/create" render={() => <StudentForm />} />
            <Route path="/schools/:id" component={School} />
            <Route path="/students/:id" render={() => <Student />} />
            <Route exact path="/schools" component={Schools} />
            <Route exact path="/students" component={Students} />
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = ({ students, schools }) => {
  return {
    students,
    schools,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadAll: () => dispatch(loadAll()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
