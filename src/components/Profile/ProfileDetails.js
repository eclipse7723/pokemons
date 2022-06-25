import React, { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Form, Alert, Button, Container } from 'react-bootstrap'


export default function ProfileDetails() {
    const {currentUser, updatePassword, updateEmail} = useAuth()
    
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        const promises = []
        
        setLoading(true)

        if (passwordRef.current.value) {
            if (passwordRef.current.value === passwordConfirmRef.current.value) {
                promises.push(updatePassword(passwordRef.current.value))
            } else {
                setError("Passwords do not match")
                return;
            }
        }

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (promises.length === 0) {
            setError("")
            setMessage("")
            setLoading(false)
            setEdit(false)
            return;
        }

        Promise.all(promises)
            .then(() => {
                setEdit(false)
                setMessage("Your changes are accepted!")
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function wrap(html) {
        return (<>
            <Container
            className="d-flex align-items-center justify-content-center"
            >
                <div className="w-100" style={{maxWidth: "400px"}}>
                    {html}
                </div>
            </Container>
        </>)
    }

    return wrap(<><React.StrictMode>

    {!edit &&
    <Button onClick={() => setEdit(true)} className="mb-4 w-100" variant="outline-secondary">
        <i className="bi bi-pencil-square"></i> Update details
    </Button>}
    
    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
    {message && <Alert variant="success" onClose={() => setMessage('')} dismissible>{message}</Alert>}
    
    <Form onSubmit={handleSubmit}>
        
        <Form.Group id="email" className="mb-4">
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control type="email" ref={emailRef}
                    defaultValue={currentUser.email}
                plaintext={!edit} readOnly={!edit}/>
        </Form.Group>

        {edit && <>
            <Form.Group id="password" className="mb-4">
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control type="password" ref={passwordRef}
                    placeholder="Enter new password or leave blank" />
            </Form.Group>

            <Form.Group id="confirmPassword" className="mb-4">
                <Form.Label><strong>Confirm password</strong></Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}
                    placeholder="Enter new password or leave blank" />
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loading}>
                Save changes
            </Button>
        </>}

    </Form>

    </React.StrictMode></>)
}
