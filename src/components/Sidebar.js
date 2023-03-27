import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddStudent from "./AddStudent";
import ManageStudents from "./ManageStudents";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { onAuthStateChanged, } from 'firebase/auth'
import 'firebase/auth'

export default function SideNavBar({ args }) {
    const [isVisible, setIsvisible] = useState(true)
    const navigate = useNavigate()

    const [home, setHome] = useState(true)

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user.email));
        return unsub;
    }, []);

    const handleHome = () => {
        // alert()
        setHome(true)
    }
    const handleStudents = () => {
        setHome(false)
    }

    const logout = () => {
        signOut(auth)
        navigate('/')
    }

    return (
        <>
            <SideNav expanded={isVisible}>
                <SideNav.Toggle
                    onClick={() => {
                        setIsvisible(!isVisible);
                    }}
                />
                <SideNav.Nav defaultSelected='addStudent' >
                    <NavItem eventKey="addStudent" className='mt-5' onClick={handleHome}>

                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Add a Student</NavText>
                    </NavItem>
                    <NavItem eventKey="manageStudents" onClick={handleStudents}>
                        <NavIcon>
                            <i className="fa fa-fw fa-bars" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Manage Student</NavText>
                    </NavItem>
                    <NavItem eventKey="logout" onClick={logout}>
                        <NavIcon >
                            <i className="fa fa-fw fa-right" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav >

            {currentUser && home && <AddStudent />}
            {currentUser && !home && <ManageStudents />}
            {/* {!currentUser && alert("Access denied !!")} */}
        </>
    );
}

// export { SideNavBar, menu };