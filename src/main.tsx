import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/styles/index.scss';
import { Provider } from 'react-redux';
import { Reducer, compose, createStore } from 'redux';
import rootReducer, { RootState } from '@/reducers/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer as Reducer<RootState, { type: string; payload: string }>,
  composeEnhancers(),
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
