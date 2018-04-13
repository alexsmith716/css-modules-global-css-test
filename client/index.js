import React from 'react';
import ReactDOM from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

const mountApp = document.getElementById('root');

// import './assets/scss/bootstrap/global.scss';

const AppRouter = () => {
  return (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  )
}

ReactDOM.hydrate(
  <AppRouter/>,
  mountApp
);
