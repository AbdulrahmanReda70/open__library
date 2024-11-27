import React, { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { GiBookshelf } from "react-icons/gi";

function MainNavbar() {
    const [showName, setShowName] = useState("");
    return (
        <div className='mainNavbar'>

            <div className='icons' >
                <NavLink to={"userProfile/personalInfo"}
                    className={({ isActive }) => (isActive || window.location.pathname.startsWith('/userProfile')) ? "icon navLink" : "navLink"}
                    onMouseEnter={() => { setShowName("profile"); }}
                    onMouseLeave={() => { setShowName(""); }}
                >
                    {showName === "profile" && <div className='nav-active'>Profile</div>}
                    <FaUser />
                </NavLink>
                <NavLink
                    to={"myBooks/allBooks"}
                    className={({ isActive }) => (isActive || window.location.pathname.startsWith('/myBooks')) ? "icon navLink" : "navLink"}
                    onMouseEnter={() => { setShowName("myBooks"); }}
                    onMouseLeave={() => { setShowName(""); }}
                >
                    {showName === "myBooks" && <div className='nav-active'>My books</div>}

                    <GiBookshelf />
                </NavLink>
                <NavLink
                    to={"bookStores"}
                    className={({ isActive }) => isActive ? "icon navLink" : "navLink"}
                    onMouseEnter={() => { setShowName("bookStores"); }}
                    onMouseLeave={() => { setShowName(""); }}
                >
                    {showName === "bookStores" && <div className='nav-active'>Book store</div>}
                    <FaStoreAlt />
                </NavLink>
            </div>
        </div>
    );
}

export default MainNavbar;