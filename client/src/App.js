import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Notes from './Notes'
import Create from './Create'


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Notes} />
        <Route path="/create" component={Create} />
      </Router>
    );
  }
}

export default App;
