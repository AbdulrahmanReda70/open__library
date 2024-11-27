import React, { useState } from 'react';
import img from "../../images/fiction.webp";
import { MdOutlineFavorite } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { NavLink, Outlet } from 'react-router-dom';
import Container from '../../Components/Container';
import ToggleButtons from '../../Components/ToggleButtons';
import { useMediaQuery } from '@mui/material';

function MyBooksPage() {
    const Is_max_width_576px = useMediaQuery("@media (max-width: 768px)");

    const [showNav, setShowNav] = useState(() => Is_max_width_576px ? false : true);
    const style = {
        backgroundColor: "#e1e4e3"
    };
    return (
        <>
            {
                Is_max_width_576px && (<div onClick={() => setShowNav(v => !v)}>
                    <ToggleButtons />
                </div>)
            }

            {showNav && (
                <div className='secondNavbar'>
                    <img src={img} alt='' />
                    <div className='myBooksNavButtons'>
                        <NavLink
                            className={"btn"}
                            to={"allBooks"}
                            style={({ isActive }) => isActive ? style : null}
                            onClick={() => Is_max_width_576px && setShowNav(false)}
                        >
                            <div>All Books</div>
                            <div className='icon'><ImBooks /></div>
                        </NavLink>
                        <NavLink to={"favorite"} onClick={() => Is_max_width_576px && setShowNav(false)} className={"btn"} style={({ isActive }) => isActive ? style : null}>
                            <div>Favorite</div>
                            <div className='icon'><MdOutlineFavorite /></div>
                        </NavLink>
                        <NavLink to={"saved"} onClick={() => Is_max_width_576px && setShowNav(false)} className={"btn"} style={({ isActive }) => isActive ? style : null}>
                            <div>Saved</div>
                            <div className='icon'><BsBookmarkCheckFill /></div>
                        </NavLink>
                    </div>
                </div>
            )}
            <Container>
                <Outlet />
            </Container>
        </>
    );


}

export default MyBooksPage;