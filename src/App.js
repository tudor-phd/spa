import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import reducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import Button from './containers/Button';
import Items from './containers/Items';
import Loading from './containers/Loading';
import './App.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

let App = () => (
  <Provider store={store}>
    <div>
      <Button />
      <Loading />
      <Items />
    </div>
  </Provider>
);

export default App;