import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import '../../assets/global.scss';
// import '../../src/assets/scss/global/global.scss';
import styles from './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes={
    route: PropTypes.object 
  }

  render() {
    return (

      <div>

        <div>
          <Helmet
            title='css-modules-global-css-test'
            titleTemplate='ThisGreatApp!: %s'
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />

          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
              <a className="navbar-brand" href="#">Election App</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><span className={`fa fa-headphones ${styles.colorGold}`}></span><span className={`${styles.colorGold}`}>Headphones!</span></a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text"></input>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav>
          </div>

          <div>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
          </div>

          <div className="container">
            {renderRoutes(this.props.route.routes)}
          </div>

        </div>

      </div>
    );
  }
}

export default withRouter(App);
