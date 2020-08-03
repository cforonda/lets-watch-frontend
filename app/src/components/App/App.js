import React from 'react';
import '../../assets/App/App.css';
import SelectScreen from '../SelectScreen';
import Screen from '../Screen';
import { Route } from 'react-router-dom';
import {useClientDetails} from '../../hooks/useClientDetails';

export default function App() {
  const {clientUsername, clientRoom} = useClientDetails();

  return (
    <div className="App">
      <Route exact path={`/`} render={ (routerProps) => < SelectScreen routerProps={routerProps} />} />
      
      { clientUsername && clientRoom ? 
            <Route exact path='/room' render={ (routerProps) => < Screen routerProps={routerProps} />} /> :
            <Route exact path='/room' render={ (routerProps) => < SelectScreen routerProps={routerProps} />} /> 
      }
    </div>
  );
}
