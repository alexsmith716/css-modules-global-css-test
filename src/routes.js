import { App, Home } from './containers';

const routes = [{
  component: App,
  routes: [
    { path: '/', exact: true, component: Home },
  ],
}];

export default routes;
