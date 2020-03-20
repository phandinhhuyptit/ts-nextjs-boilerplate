/* tslint:disable:no-default-export */
import {Component} from 'react';
import Head from 'next/head';
import {everyone} from '../hocs';

class IndexPage extends Component {
  public render() {
    return (
      <main className="app-masthead" role="main">
        <Head>
          <title>LoopNext</title>
        </Head>
        <div className="container">
          <div className="align-items-center order-md-1 text-md-left pr-md-5">
            <h1 className="mb-3 app-text--brand text-primary">LoopNext</h1>
            <p className="lead">
              Scaffolding project template with common functionality implemented out-of-the-box with best practices and
              general standards. Including:
            </p>
            <div className="masthead-followup row m-0 border border-white">
              <div className="col-md-4 p-3 p-md-5 bg-light border border-white">
                <h3>User pages</h3>
                <ul>
                  <li>Login</li>
                  <li>SignUp</li>
                  <li>Logout</li>
                  <li>Forget password</li>
                  <li>Update profile</li>
                  <li>Change password</li>
                </ul>
              </div>
              <div className="col-md-4 p-3 p-md-5 bg-light border border-white">
                <h3>Admin dashboard</h3>
                <ul>
                  <li>Login</li>
                  <li>SignUp</li>
                  <li>Logout</li>
                  <li>Forget password</li>
                  <li>Update profile</li>
                  <li>Change password</li>
                  <li>
                    User management (user list with search, sort, pagination - user CRUD operation- deactivate user
                    account
                  </li>
                  <li>Site analytics configuration management</li>
                  <li>Email configuration management</li>
                  <li>Backup management</li>
                  <li>Cron job management</li>
                  <li>Cloud storage management</li>
                  <li>Server availability management</li>
                </ul>
              </div>
              <div className="col-md-4 p-3 p-md-5 bg-light border border-white">
                <h3>There're more things</h3>
                <ul>
                  <li>Multi-languages implementation</li>
                  <li>OOP + MVC + Domain driven design + Flux architecture</li>
                  <li>Javascript standard & linting</li>
                  <li>BEM CSS standard & SCSS linting</li>
                  <li>Production optimization</li>
                  <li>Docker configuration & deployment</li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row lead mb-3 mt-5">
              <a href="/#getting-started" className="btn btn-lg btn-outline-primary mb-3 mb-md-0 mr-md-3 btn--large">
                Get started
              </a>
              <a
                target="_blank"
                href="https://gitlab.com/dayone-teams/int-boilerplates/int-loopnext"
                className="btn btn-lg btn-outline-secondary btn--large">
                Check out source code
              </a>
            </div>
            <p className="text-muted mb-0">Currently v1.0.0</p>
          </div>
          <h2 id="getting_started" className="mt-5 app-text--brand text-primary">
            Getting Started
          </h2>
          <div className="bg-light p-3 mt-3">
            <pre>
              <code>
                git clone git@gitlab.com:dayone-teams/int-boilerplates/int-loopnext.git
                <br />
                npm install
                <br />
                npm run dev
              </code>
            </pre>
          </div>
        </div>
      </main>
    );
  }
}

export default everyone(IndexPage);
