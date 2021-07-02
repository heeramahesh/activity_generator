import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Activity from './components/Activity'

function App() {
  return (
    <div className="App">
  <Router>
  <Route exact path="/">
      <Activity />
  </Route>
  
</Router>
    </div>
  );
}

export default App;
