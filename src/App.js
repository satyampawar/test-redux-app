import React from 'react';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './Main'
import ReduxToastr from 'react-redux-toastr'

import createHistory from 'history/createBrowserHistory';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

export const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// import '../public/assets/css/reset.css';

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(historyMiddleware, thunk))
);


export default () => (
  <Provider store={store}>
  	<ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="bounceIn"
      transitionOut="bounceOut"
      progressBar
      closeOnToastrClick/>
    <Main history={history}/>
  </Provider>
);


