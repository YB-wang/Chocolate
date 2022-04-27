import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import useNavgiate2 from '@/Hooks/useNavgiate';
// about
const About = () => {
    const navigate = useNavgiate2();
    return (
        <div>
            <h1>About page</h1>
            <Button onClick={() => navigate('V2')}>to V2</Button>
            <Outlet />
        </div>
    );
};

export default About;
