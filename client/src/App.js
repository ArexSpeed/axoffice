import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import './styles/Style.scss';
import Main from './pages/Main';
import Office from './pages/Office';
import Projects from './pages/Projects'
import Lists from './pages/Lists'

function App() {
  const user = "User"
  return (
    <div className="App">
      {user ? 
      (
        <div className="container">
        <Router>  
        <Switch>
          <Route exact path="/" component={Office} />
          <Route path="/projects" component={Projects} />
          <Route path="/lists" component={Lists} />
        </Switch>

        </Router>
      </div>
      )
      :
      (
        <Main />
      )
      }
    </div>
  );
}

export default App;
