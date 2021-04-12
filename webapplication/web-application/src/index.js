import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './views/App';
import reportWebVitals from './tests/reportWebVitals';
import { Provider } from 'react-redux';
import {SessionProvider} from '@inrupt/solid-ui-react';
import store from './utils/locationsRedux/store.js';


ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
