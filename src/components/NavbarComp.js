import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'

export default function NavbarComp({ loggedUser }) {
    return (
        <div>
            <Navbar bg='light'>
                <Container className='nav-container'>
                    <Navbar.Brand href="#home">Resolute AI Software</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <i className="fas fa-user mx-3"></i><span href="#login">{loggedUser.email}</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
