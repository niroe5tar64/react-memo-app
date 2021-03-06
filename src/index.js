import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import './index.css';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import MemoStore, { memoReducer } from './memo/Store';
import * as serviceWorker from './serviceWorker';

// Redux Persistの設定
const persistConfig = {
  key: 'memo',
  storage,
  blacklist: ['message', 'mode', 'fdata'],
  whitelist: ['data']
};

// パーシストレデューサーの作成
const persistedReducer = persistReducer(persistConfig, memoReducer);

// ストア、パーシスターの作成
let store = createStore(persistedReducer);
let pstore = persistStore(store);

// 表示をレンダリング
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>loading...</p>} persistor = {pstore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default pstore;