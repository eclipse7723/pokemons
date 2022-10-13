import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";


export default function Header() {
    const { currentUser, loginUserData } = useAuth()

    function setLoginInfo() {
        if (currentUser) {
            return <a href="/profile"><i className="bi bi-person"></i>
                {(loginUserData && loginUserData.nickname) || currentUser.email}</a>
        } else {
            return <a href="/auth/login" ><i className="bi bi-box-arrow-in-right"></i>Log In</a>
        }
    }

    return (<>
    
    <Navbar bg="light" expand="sm" className="mb-4">
    <Container>

        <Navbar.Brand href="/">Pokemons</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          
            <Navbar.Text className="nav-display-name">
                {setLoginInfo()}
            </Navbar.Text>
          
        </Navbar.Collapse>


    </Container>
    </Navbar>
    
    </>)
}