import React, {useRef, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";


export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signUp} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            console.log(emailRef.current.value, passwordRef.current.value)
            await signUp(emailRef.current.value, passwordRef.current.value)

        } catch (error) {
            console.log()
            setError(error.message)
        }
        setLoading(false)

    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            ref={passwordRef} required />
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>ConfirmPassword</Form.Label>
                        <Form.Control type="password"
                            ref={passwordConfirmRef} required />
                    </Form.Group>

                    <Button
                        className="w-100 mt-4" type="submit"
                        disabled={loading}>
                        Sign Up
                    </Button>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? Log in
        </div>
    </>)

}