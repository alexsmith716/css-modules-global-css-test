import express from 'express';
import compression from 'compression';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router';
import routes from '../client/routes';

app.use(compression());
app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));

const renderFullPage = (html) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible' content='IE=edge">
        <meta name="viewport', content='width=device-width, initial-scale=1">
        <title>css-modules-global-css-test</title>
        <link rel="stylesheet" href="${'/styles.css'}">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src='${'/vendor.js'}'></script>
        <script src='${'/app.js'}'></script>
      </body>
      </body>
    </html>
  `;
};

app.use((req, res, next) => {

  const matchedRoute = routes.reduce((accumulatedRoute, route, index) => {

    const matchedPath = matchPath(req.url, route.path, route);

    if (matchedPath && matchedPath.isExact) {

      const promise = route.component.fetchData ? route.component.fetchData({ params: matchedPath.params }) : Promise.resolve(null)

      accumulatedRoute.push({
        route,
        matchedPath,
        promise: promise,
      })

    }

    return accumulatedRoute;

  }, []);

  const promises = matchedRoute.map((match) =>  {
    return match.promise
  });

  Promise.all(promises)

  .then((data) => {

    let context = {};

    const appHtml = ReactDOM.renderToString(

      <StaticRouter context={ context } location={ req.url }>
        {renderRoutes(routes)}
      </StaticRouter>

    );

    if (context.url) {

      res.redirect(302, context.url);

    } else if (context.status === 404) {

      res.status(404);
        
    } else {

      let html = renderFullPage(appHtml);

      res.set('content-type', 'text/html');

      res.status(200);
      
      res.send(html);

    };

  })
  .catch((error) => next(error));

});

app.listen(3000, (error) => {
  if (error) {
    console.log('>>>>>>>> Server Error: ', error);
  } else {
    console.log(`>>>>>>>> Server is running on port 3000 <<<<<<<<<<<`);
  }
});

export default app;
