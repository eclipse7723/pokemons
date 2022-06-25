import React from "react";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
import NotFoundPage from "./NotFoundPage";
import { Alert, Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom"

export default function AuthPage() {
    const {currentUser} = useAuth()
    const navigate = useNavigate()

    function wrap(page) {
        return (<>
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    {page}
                </div>
            </Container>
        </>)
    }

    function switchPage(page) {
        console.log(currentUser)
        if (currentUser) {
            return (<>
                {/* <Container className="flex-column justify-content-center align-self-center" style={{textAlign: "center"}}> */}
                <Container>

                    <Row>
                        <Col sm={5}>
                            <img src="https://a.allegroimg.com/original/1196f4/c13377a34b4d93aaacceb63317c9" width="100%"/>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center">
                            <Alert variant="danger" className="align-items-top">You have already authorized</Alert>
                            <Button variant="outline-danger" onClick={() => navigate("/profile")}>
                                <i className="bi bi-person-square"></i> Open Profile
                            </Button>
                        </Col>
                    </Row>

                    {/* <Alert variant="danger" className="align-items-top">You have already authorized</Alert>
                    <img src="https://a.allegroimg.com/original/1196f4/c13377a34b4d93aaacceb63317c9" style={{width: "50vmin"}}/>
                    
                    <Button variant="outline-danger" onClick={navigate("/profile")}>
                        <i class="bi bi-person-square"></i> Open Profile
                    </Button> */}
                </Container>
            </>)
        } else {
            return wrap(page)
        }
    }

    return (<><React.StrictMode>
        
        <Routes>
            <Route path="/" element={switchPage(<Login/>)} />
            <Route path="/register" element={switchPage(<SignUp/>)} />
            <Route path="/login" element={switchPage(<Login/>)} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
            
    </React.StrictMode></>)

}