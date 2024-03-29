import React, {useRef, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {currentUser, login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    if (currentUser) return <Navigate replate to="/profile" />;

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch (error) {
            let errorCode = error.code
            if (["auth/user-not-found", "auth/wrong-password"].includes(errorCode)) {
                setError("User with this email or password not found")
            }
            else setError(error.message)
        }
        setLoading(false)

    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" autoComplete="email"
                            ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="current-password"
                            ref={passwordRef} required />
                    </Form.Group>

                    <Button type="submit"
                        className="w-100 mb-2" 
                        disabled={loading}>
                        Log in
                    </Button>
                    
                    <div className="w-100 text-center">
                        <Link to="/auth/forgot-password">Forgot password</Link>
                    </div>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/auth/register">Sign Up</Link>
        </div>
    </>)

}