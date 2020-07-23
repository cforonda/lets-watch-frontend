import React from 'react';
import '../../assets/App/App.css';
import Screen from '../Screen';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path={`/`} render={ (routerProps) => < Screen routerProps={routerProps} />} />  
    </div>
  );
}

export default App;
