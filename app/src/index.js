import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SocketProvider from './hooks/useSocket';
import ClientDetailsProvider from './hooks/useClientDetails';

ReactDOM.render(
    <ClientDetailsProvider>
        <SocketProvider>
            <Router basename={process.env.PUBLIC_URL}>
                <Header />
                <App />
                <Footer />
            </Router>
        </SocketProvider>
    </ClientDetailsProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
