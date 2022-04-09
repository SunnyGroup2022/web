import React from 'react';
import Menu from '../Common/Menu';
import Head from '../Common/Head';
import './index.css';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Head />
        <Menu />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"></main>
      </div>
    </div>
  );
};

export default Dashboard;
