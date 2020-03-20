/* tslint:disable:no-default-export */
import React, {Component} from 'react';
import Head from 'next/head';
import {adminOnly} from '../../hocs';
import '../../scss/admin/index.scss';

class AdminDashboardPage extends Component {
  public render() {
    return (
      <div id="admin-dashboard-page">
        <Head>
          <title>Admin - Dashboard</title>
        </Head>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="card text-white bg-gradient-info">
              <div className="card-body">
                <div>
                  <div className="text-value-lg">1,000</div>
                  <div>Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default adminOnly(AdminDashboardPage);
