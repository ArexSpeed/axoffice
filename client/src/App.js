import {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './styles/Style.scss';
import Main from './pages/Main';
import Office from './pages/Office';
import Projects from './pages/Projects'
import Lists from './pages/Lists'
import Budgets from './pages/Budgets'
import { GlobalContext } from "./GlobalProvider";

function App() {
  const [{userInfo}] = useContext(GlobalContext)
  console.log(userInfo, "user")
  return (
    <div className="App">
      {userInfo ? 
      (
        <div className="container">
        <Router>  
        <Switch>
          <Route exact path="/" component={Office} />
          <Route path="/projects/:id" component={Projects} />
          <Route path="/projects" component={Projects} />
          <Route path="/lists/:id" component={Lists} />
          <Route path="/lists" component={Lists} />
          <Route path="/budgets/:id" component={Budgets} />
          <Route path="/budgets" component={Budgets} />
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
