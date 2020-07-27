import React from 'react';
import '../../assets/App/App.css';
import SelectScreen from '../SelectScreen';
import Screen from '../Screen';
import { Route } from 'react-router-dom';
import {useSocket} from '../../hooks/useSocket';


export default function App() {
  const {socketNickname, socketRoom} = useSocket();
  return (
    <div className="App">
      <Route exact path={`/`} render={ (routerProps) => < SelectScreen routerProps={routerProps} />} />
      
      { socketNickname && socketRoom ? 
            <Route exact path='/room' render={ (routerProps) => < Screen routerProps={routerProps} />} /> :
            <Route exact path='/room' render={ (routerProps) => < SelectScreen routerProps={routerProps} />} /> 
      }
    </div>
  );
}
