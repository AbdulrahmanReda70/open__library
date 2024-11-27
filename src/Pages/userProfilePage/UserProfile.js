import React from 'react';
import { Outlet } from 'react-router';
import Container from '../../Components/Container';

function UserProfile() {
    return (
        <div className='userProfile'>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

export default UserProfile;