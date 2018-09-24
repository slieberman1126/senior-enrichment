/*import React, { Component } from 'react';
import Home from './components/Home';
import Nav from './components/Nav';
import School from './components/School';
import SchoolForm from './components/SchoolForm';
import Schools from './components/Schools';
import Student from './components/Student';
import StudentForm from './components/StudentForm';
import Students from './components/Students';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getSchools } from './store';
import { connect } from 'react-redux';

class Main extends Component {
  componentDidMount() {
    this.props.getSchools();
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div>
            <Route path="/students/:id" component={Student} />
            <Route path="/schools/:id" component={School} />
            <Route path="/students/create" component={StudentForm} />
            <Route path="/schools/create" component={SchoolForm} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/schools" component={Schools} />
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSchools: () => dispatch(getSchools()),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Main);
*/
import React, { Component } from 'react';
import Nav from './Nav';
import store, { getSchools, getStudents } from '../store';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Schools from './Schools';
import Students from './Students';
import SchoolItem from './SchoolItem';
import StudentItem from './StudentItem';

class Main extends Component {
  componentDidMount() {
    store.dispatch(getSchools());
    store.dispatch(getStudents());
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route
                path="/schools/:id"
                render={(match, history) => (
                  <SchoolItem
                    id={match.params.id}
                    history={history}
                    school={school}
                  />
                )}
              />
              <Route path="/students/:id" render={() => <StudentItem />} />
              <Route exact path="/schools" render={() => <Schools />} />
              <Route exact path="/students" render={() => <Students />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
