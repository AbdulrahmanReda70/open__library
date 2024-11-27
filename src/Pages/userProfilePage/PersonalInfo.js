import { useEffect, useState } from 'react';
import { onAuthStateChanged, } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { getAuth, deleteUser } from "firebase/auth";

import img from "../../images/bookLand.jfif";
import { useRemoveUserMutation, useSignOutMutation } from '../../api/authApiSlice';
function PersonalInfo() {
    const [signOut] = useSignOutMutation();
    const [removeUser] = useRemoveUserMutation();

    const [user, setUser] = useState("");
    const userId = user.uid;
    const deleteAccount = async (user) => {

        let confirm = window.confirm("Are you sure you want to continue⚠");
        if (confirm) {
            try {
                await deleteUser(user);
                console.log("User account deleted successfully.");
            } catch (error) {
                console.error("Error deleting user account:", error.message);
            }
        } else {
            console.log("No user is currently signed in.");
        }


    };
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [user]);

    console.log("user=", userId);
    return (
        <div className='personalInfo'>
            <div className='profile'>
                {user.photoURL ? <img src={user.photoURL} alt='' /> : <img src={img} alt='' />}
                <div>
                    <h2>{user?.displayName || "Fiction"}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className='account-security'>
                <h1>My Info</h1>
                <div className='security-option'>
                    <p><b>Email</b> <br></br>{user?.email}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
                <div className='security-option'>
                    <p>Delete account</p>
                    <button onClick={() => deleteAccount(user)} style={{ backgroundColor: "red" }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;