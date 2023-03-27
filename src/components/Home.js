import React from 'react'
import { onAuthStateChanged, } from 'firebase/auth'
import 'firebase/auth'
import { auth } from '../firebase-config';
import { useState, useEffect } from 'react';
import NavbarComp from './NavbarComp';
import SideNavBar from './Sidebar';

export default function Home() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user.email));
        return unsub;
    }, []);

    return (
        <>
            <div>
                <NavbarComp loggedUser={{ email: currentUser }} />
                <SideNavBar />
            </div>
        </>
    )
}
