import Home from './pages/Home';
import Profile from './pages/Profile';
import AlbumPage from './pages/AlbumPage';
import PostPage from './pages/PostPage';

// Import react router for dynamic page functionality
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* switch tag gives url definitions with an id parameter included */}
      {/* the components are functions defined in pages folder */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/profile/:id" exact component={Profile}></Route>
          <Route path="/albums/:id" exact component={AlbumPage}></Route>
          <Route path="/posts/:id" exact component={PostPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
