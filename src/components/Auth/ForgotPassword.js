import React, {useRef, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export default function ForgotPassword() {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Account recovery instructions have been sent to your email address.')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            ref={emailRef} required />
                    </Form.Group>

                    <Button type="submit"
                        className="w-100 mb-2" 
                        disabled={loading}>
                        Reset Password
                    </Button>
                    
                    <div className="w-100 text-center">
                        <Link to="/auth/login">Login</Link>
                    </div>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/auth/register">Sign Up</Link>
        </div>
    </>)

}