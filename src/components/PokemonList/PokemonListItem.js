import React, {useState, useEffect} from "react";
import { Card, Placeholder, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { SVG, findStat } from "../../utils";


let ICON_PARAMS = { width: '215px', height: '215px', marginTop: '10px'}


export default function PokemonListItem({name, url}) {
    const [iconPictureUrl, setIconPictureUrl] = useState()
    const [data, setData] = useState({})
    const [stats, setStats] = useState({})

    function fillStats(statsList) {
        const statsListNames = ["hp", "attack", "defense"]
        statsListNames.map(name => stats[name] = findStat(statsList, name))
        setStats(stats)
    }
    
    const [loading, setLoading] = useState(true)
    const controller = new AbortController()
    const signal = controller.signal
    useEffect(() => {
        setLoading(true)
        
        fetch(url, {signal: signal})
        .then(response => response.json())
        .then(res => {
            let pictureUrl = res.sprites.other.dream_world.front_default
            if (pictureUrl === null) pictureUrl = res.sprites.front_default
            
            setIconPictureUrl(pictureUrl)
            setData(res)
            fillStats(res.stats)
            setLoading(false)
        })

        return () => controller.abort()
    }, [url])

    function svg(name) {
        return SVG(name, 20, 20)
    }

    if (loading) return (<>
        <Card style={{ width: '18rem', alignItems: 'center'}}>
            {/* <Card.Img variant="top" src={iconPictureUrl} /> */}
            <Card.Body>
                <Card.Img variant="top" src={null} style={ICON_PARAMS}/>
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
            <Card.Img variant="top" src={iconPictureUrl} style={ICON_PARAMS}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <ListGroup className="d-flex justify-content-around flex-row">
                        {stats.hp && <div className="stat-param">{svg("health")} <span>{stats.hp.base_stat}</span></div>}
                        {stats.attack && <div className="stat-param">{svg("sword")} <span>{stats.attack.base_stat}</span></div>}
                        {stats.defense && <div className="stat-param">{svg("shield")} <span>{stats.defense.base_stat}</span></div>}
                </ListGroup>
                <ListGroup className="list-group-flush">
                    
                    
                    <ListGroupItem>Number of abilities: {data.abilities.length}</ListGroupItem>
                </ListGroup>

                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>

    )
}