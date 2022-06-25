import React, { useState } from 'react'
import { Container, Alert, Button, ListGroup } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useNavigate } from "react-router-dom";
import ProfileDetails from '../components/Profile/ProfileDetails';
import FavouritePokemons from '../components/Profile/FavouritePokemons';


export default function MyProfilePage() {
    const [section, setSection] = useState('profile')
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    if (!currentUser) return <Navigate replate to="/auth/login" />;
    
    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/auth/login")
        } catch (error) {
            setError(error.message)
        }
        
        setError('')
    }

    return (<>
    <Container>
        <Button variant="black" onClick={handleLogout} style={{float: "right"}}>
            <i className="bi bi-box-arrow-left" alt=""></i> Log Out
        </Button>

        <h2 className="text-center mb-4">My Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Tabs
            activeKey={section}
            onSelect={(s) => setSection(s)}
            className="mb-3"
        >
            <Tab eventKey="profile" title="Profile">
                <ProfileDetails/>
            </Tab>
            
            <Tab eventKey="favourites" title="Favourite pokemons">
                <FavouritePokemons/>
            </Tab>

        </Tabs>


    </Container>

    
    </>)
}
