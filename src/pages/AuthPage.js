import React from "react";
import SignUp from "../Auth/SignUp";
import { Container } from "react-bootstrap";


export default function AuthPage() {
    return (<><React.StrictMode>

        <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <SignUp/>
            </div>
        </Container>

    </React.StrictMode></>)

}