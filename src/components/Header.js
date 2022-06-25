import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";


export default function Header() {
    const { currentUser } = useAuth()

    function setLoginInfo() {
        let style = {textDecoration: "none"}
        if (currentUser) {
            return <a href="/profile" style={style}><i className="bi bi-person"></i> {currentUser.email}</a>
        } else {
            return <a href="/auth/login" style={style}><i className="bi bi-box-arrow-in-right"></i> Log In</a>
        }
    }

    return (<>
    
    <Navbar bg="light" expand="sm" className="mb-4">
    <Container>

        <Navbar.Brand href="/">Pokemons</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          
            <Navbar.Text>
                {setLoginInfo()}
            </Navbar.Text>
          
        </Navbar.Collapse>


    </Container>
    </Navbar>
    
    </>)
}