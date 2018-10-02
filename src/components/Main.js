import React, { Component } from 'react';
import { loadAll } from '../store';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
            <Switch>
              <Route exact path="/schools/create" component={SchoolForm} />} />
              <Route path="/schools/:id" component={School} />
            </Switch>
            <Switch>
              <Route exact path="/students/create" component={StudentForm} />
              }/>
              <Route path="/students/:id" component={Student} />
            </Switch>
            <Route exact path="/schools" component={Schools} />
            <Route exact path="/students" component={Students} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAll: () => dispatch(loadAll()),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Main);
