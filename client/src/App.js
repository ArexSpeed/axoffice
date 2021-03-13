import './styles/Style.scss';
import Main from './pages/Main';
import Office from './pages/Office';

function App() {
  const user = "User"
  return (
    <div className="App">
      {user ? 
      (
        <Office />
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
