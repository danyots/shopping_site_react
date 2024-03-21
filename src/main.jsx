import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import AppReducer from './AppProducer.jsx';

const appStore = legacy_createStore(AppReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
<React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
  
  
)
