import 'antd/dist/antd.css';
import './App.less';
import React from 'react';
import AdminLayout from './Layout/AdminLayout';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <AdminLayout />
        </Router>
    );
};

export default App;
