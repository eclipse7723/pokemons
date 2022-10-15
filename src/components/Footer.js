import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Footer() {
    const { currentUser, loginUserData } = useAuth()

    return (<>
    
    <div className="footer bg-light">
        <Container className="footer-content">

            {currentUser && <span className="footer-text">
                uuid: <span className="footer-uuid">{currentUser.uid}</span>
            </span>}

        </Container>
    </div>
    
    </>)
}