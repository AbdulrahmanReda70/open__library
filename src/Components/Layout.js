import React, { useState } from 'react';
import { Outlet } from 'react-router';
import "./layout.css";
import MainNavbar from './MainNavbar';
import Container from './Container';
import SecondNavbar from './SecondNavbar';
function Layout() {
    const [search, setSearch] = useState(null);
    return (
        <div className='layout'>
            <MainNavbar />
            <Outlet context={{ setSearch, search }} />
        </div>
    );
}

export default Layout;