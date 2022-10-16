import React, { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Form, Alert, Button, Container } from 'react-bootstrap'
import { Row, Col } from "react-bootstrap";

import { usersRef, updateUserParams } from '../../services/firestore';
import { getDocs, query, where } from "firebase/firestore";


export default function ProfileDetails() {
    const {currentUser, loginUserData, updateLoginUserData, updatePassword, updateEmail} = useAuth()
    
    const [edit, setEdit] = useState(!loginUserData)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const nicknameRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    function discardChanges() {
        document.getElementById("update-profile-details").reset();
        setLoading(false)
        setEdit(false)
    }

    async function checkNickname(value) {
        let lastNickname = loginUserData.nickname
        if (lastNickname && value.toLowerCase() === lastNickname.toLowerCase()) return;

        let constraints = new RegExp(/^\w{3,24}$/)

        if (!constraints.test(value)) {
            setErrorMessage("Do not use space or special symbols in your nickname. Also nickname length should be from 3 to 24 symbols.")
            return false;
        }

        const q = query(usersRef, where('nickname', "==", value))
        const querySnapshot = await getDocs(q)
        let queryData = []
        querySnapshot.forEach((doc) => {
            queryData.push(doc.data())
        });

        if (queryData.length > 0) {
            setErrorMessage("This nickname is already in use")
            return false;
        }

        return true;
    }

    function checkName(value, label, key) {
        let lastValue = loginUserData.name[key]
        if (lastValue && value.toLowerCase() === lastValue.toLowerCase()) return;
        
        let constraints = new RegExp(/^[a-zA-Z]{1,64}$/)

        if (!constraints.test(value)) {
            setErrorMessage(`Your ${label} is not valid`)
            return false;
        }

        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        const promises = []
        const updateUserDetails = {}
        
        let nickname = nicknameRef.current.value
        if (nickname) {
            let ok = await checkNickname(nickname)
            if (ok === false) {
                setLoading(false);
                return;
            } else if (ok === true) updateUserDetails.nickname = nickname
        }
        
        let firstName = firstNameRef.current.value
        let lastName = lastNameRef.current.value
        if (firstName || lastName) {
            updateUserDetails.name = {first_name: firstName, last_name: lastName}

            if (firstName) {
                let ok = checkName(firstName, "first name", "first_name")
                if (ok === false) {
                    setLoading(false);
                    return;
                } else if (ok === true) updateUserDetails.name.first_name = firstName
            }
            if (lastName) {
                let ok = checkName(lastName, "last name", "last_name")
                if (ok === false) {
                    setLoading(false);
                    return;
                } else if (ok === true) updateUserDetails.name.last_name = lastName
            }
        }

        if (passwordRef.current.value) {
            if (passwordRef.current.value === passwordConfirmRef.current.value) {
                promises.push(updatePassword(passwordRef.current.value))
            } else {
                setErrorMessage("Passwords do not match")
                setLoading(false)
                return;
            }
        }

        if (emailRef.current.value !== currentUser.email) {
            promises.push(await updateEmail(emailRef.current.value))
        }

        if (Object.keys(updateUserDetails).length !== 0) {
            await updateUserParams(currentUser.uid, updateUserDetails)
            await updateLoginUserData()
        }

        if (promises.length === 0) {
            setErrorMessage("")
            setSuccessMessage("")
            setLoading(false)
            setEdit(false)
            return;
        }

        Promise.all(promises)
            .then(() => {
                setSuccessMessage("Your changes are accepted!")
                setEdit(false)
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function wrap(html) {
        return (<>
            <Container className="d-flex align-items-center justify-content-center">
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
    
    {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
    {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
    
    <Form onSubmit={handleSubmit} className="profile-details" id="update-profile-details">
        
        <Form.Group id="nickname" className="mb-4">
            <Form.Label><strong>Nickname</strong></Form.Label>
            <Form.Control type="text" ref={nicknameRef}
                defaultValue={loginUserData.nickname}
                placeholder="Your nickname"
                plaintext={!edit} readOnly={!edit}/>
        </Form.Group>
        
        <Form.Group id="name" className="mb-4">
            <Row>
                <Col>
                    <Form.Label><strong>First name</strong></Form.Label>
                    <Form.Control type="text" ref={firstNameRef}
                        defaultValue={loginUserData.name.first_name}
                        placeholder="Your first name"
                        plaintext={!edit} readOnly={!edit}/>
                </Col>
                <Col>
                    <Form.Label><strong>Last name</strong></Form.Label>
                    <Form.Control type="text" ref={lastNameRef}
                        defaultValue={loginUserData.name.last_name}
                        placeholder="Your last name"
                        plaintext={!edit} readOnly={!edit}/>
                </Col>
            </Row>
        </Form.Group>
        
        <Form.Group id="email" className="mb-4">
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control type="email" ref={emailRef}
                defaultValue={currentUser.email} autoComplete="email"
                plaintext={true} readOnly={true}/>
        </Form.Group>

        {edit && <>
            <Form.Group id="password" className="mb-4">
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control type="password" ref={passwordRef} autoComplete="new-password"
                    placeholder="Enter new password or leave blank" />
            </Form.Group>

            <Form.Group id="confirmPassword" className="mb-4">
                <Form.Label><strong>Confirm password</strong></Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} autoComplete="new-password"
                    placeholder="Enter new password or leave blank" />
            </Form.Group>

            <Row>
                <Col>
                    <Button onClick={discardChanges} variant="secondary"
                        className="w-100" disabled={false}>
                        Discard changes
                    </Button>
                </Col>
                <Col>
                    <Button type="submit" className="w-100" disabled={loading}>
                        Save changes
                    </Button>
                </Col>
            </Row>
        </>}

    </Form>

    </React.StrictMode></>)
}
