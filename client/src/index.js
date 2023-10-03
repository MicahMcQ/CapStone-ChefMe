import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("roor"));
root.render(
    <App />,
    <AppRouter />
)