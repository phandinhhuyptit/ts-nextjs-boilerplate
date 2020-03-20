import React from 'react';
import Head from 'next/head';

export const everyone = (Content: React.ElementType) => {
  return class Wrapper extends React.Component {
    public render() {
      return (
        <div>
          <Head>
            <title>NextJs Boilerplate</title>
          </Head>
          {this._renderNavBar()}
          <Content {...this.props} />
          {this._renderFooter()}
        </div>
      );
    }

    public _renderNavBar = () => {
      return (
        <header className="app-navbar navbar navbar-expand navbar-dark">
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav">
              <li className="nav-item"></li>
            </ul>
          </div>
        </header>
      );
    };

    public _renderFooter = () => {
      return (
        <footer className="app-footer text-muted">
          <div className="container-fluid p-3 p-md-5">
            <ul className="bd-footer-links">
              <li>
                <a href="https://gitlab.com/dayone-teams/int-boilerplates/int-loopnext">GitLab</a>
              </li>
              <li>
                <a href="https://www.dayoneteams.com" target="_blank">
                  About
                </a>
              </li>
            </ul>
            <p>
              Designed and built with all the love in the world by&nbsp;
              <a href="http://www.dayoneteams.com" target="_blank">
                DayOne Teams
              </a>
            </p>
          </div>
        </footer>
      );
    };
  };
};
