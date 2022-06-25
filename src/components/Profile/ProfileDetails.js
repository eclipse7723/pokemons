import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { ListGroup } from 'react-bootstrap'


export default function ProfileDetails() {
    const {currentUser} = useAuth()

    return (<>

    <ListGroup variant="flush">

        <ListGroup.Item>
            <strong>Email:</strong> {currentUser.email}
        </ListGroup.Item>

    </ListGroup>

    </>)
}
