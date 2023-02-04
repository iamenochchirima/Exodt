import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import SocketServices from './SocketServices';

import { Provider } from 'react-redux';
import store from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
          <SocketServices/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
