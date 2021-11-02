import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Posts from './pages/Posts';

// Import react router for dynamic page functionality
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/profile/:id" exact component={Profile}></Route>
          <Route path="/album/:id" exact component={Album}></Route>
          <Route path="/posts/:id" exact component={Posts}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
