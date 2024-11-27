import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.webp";

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-left'>
            </div>
            <div className='navbar-right'>
                <div className='nav-buttons'>
                    <Link to={"/signIn"} > <button className='btn-signIn'> Sign in</button></Link>
                    <Link to={"/signUp"} > <button className='btn-signUp'>Sign up</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;