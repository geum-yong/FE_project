import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import 'antd/dist/antd.css';
import rootReducer, { rootSaga } from './modules';

require('dotenv').config();

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store =
  process.env.REACT_APP_SERVER_URL === 'production'
    ? createStore(rootReducer, applyMiddleware(sagaMiddleware))
    : createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
