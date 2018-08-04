import React from 'react';
import Employees from './employees/Employees';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div className="row">
            <div className="col-md-10">
                <Employees/>
            </div>
            <div className="col-md-2">
                <Sidebar/>
            </div>
        </div>
    );
};

export default Dashboard;