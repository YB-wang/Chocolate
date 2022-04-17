import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
// about
const About = () => {
    const navigate = useNavigate();
    useEffect(() => navigate('/About/V1'), []);
    return (
        <div>
            <h1>About page</h1>
            <Button onClick={() => navigate('V2')}>to V2</Button>
            <Outlet />
        </div>
    );
};

export default About;
