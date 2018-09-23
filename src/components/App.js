import React, { Component } from 'react';
import SchoolsList from './SchoolsList';
import StudentList from './StudentList';
import Nav from './Nav';
import store, { getSchools } from '../store/index';
import { HashRouter as Router, Route } from 'react-router-dom';
class App extends Component {
  /*componentDidMount() {
    store.dispatch(getSchools());
  }
  render() {
    return (
      <Router>
        <div>
          <Route component={Nav} />
          <Route path="/students" component={StudentList} />
          <Route path="/schools" component={SchoolsList} />
        </div>
      </Router>
    );
  }*/
  render() {
    return <Nav />;
  }
}
export default App;
