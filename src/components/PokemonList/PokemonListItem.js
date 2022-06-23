import React, {useState, useEffect} from "react";
import { Card, Placeholder, ListGroup, ListGroupItem } from "react-bootstrap";


export default function PokemonListItem({name, url}) {
    const [iconPictureUrl, setIconPictureUrl] = useState()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    
    const controller = new AbortController()
    const signal = controller.signal
    useEffect(() => {
        setLoading(true)
        
        fetch(url, {signal: signal})
        .then(response => response.json())
        .then(res => {
            let pictureUrl = res.sprites.other.dream_world.front_default
            setIconPictureUrl(pictureUrl)
            setData(res)
            setLoading(false)
        })

        return () => controller.abort()
    }, [url])

    if (loading) return (<>
        <Card style={{ width: '18rem', alignItems: 'center'}}>
            {/* <Card.Img variant="top" src={iconPictureUrl} /> */}
            <Card.Body>
                <Card.Img variant="top" src={null} style={{ width: '200px', height: '200px', marginTop: '10px'}}/>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                {/* <Placeholder.Button variant="primary" xs={6} /> */}
            </Card.Body>
        </Card>
    </>)

    return (

        <Card style={{ width: '18rem', alignItems: 'center'}}>
            <Card.Img variant="top" src={iconPictureUrl} style={{ width: '200px', height: '200px', marginTop: '10px'}}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <ListGroup className="list-group-flush">
                    <ListGroupItem>Number of abilities: {data.abilities.length}</ListGroupItem>
                </ListGroup>

                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>

    )
}