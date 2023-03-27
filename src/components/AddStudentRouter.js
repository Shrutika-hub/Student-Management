import React from 'react'
import { onAuthStateChanged, } from 'firebase/auth'
import 'firebase/auth'
import { auth } from '../firebase-config';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NavbarComp from './NavbarComp'
import SideNavBar from './Sidebar';
import AddStudent from './AddStudent';

export default function AddStudentRouter() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user.email));
        return unsub;
    }, []);

    return (
        <>
            {!currentUser && (
                <Navigate to="" replace={true} />
            )}
            <div>
                <NavbarComp loggedUser={{ email: currentUser }} />
                {/* <SideNavBar args={{ default: 'addStudent' }} /> */}
                <SideNavBar />
                <AddStudent />
            </div>
        </>
    )
}
