import React, {useState, useEffect} from "react";
import { Card, Placeholder, ListGroup, ListGroupItem } from "react-bootstrap";
import { SVG, findStat } from "../../utils";
import FavouriteButton from "../FavouriteButton";
import {useAuth} from "../../contexts/AuthContext"



export default function PokemonListItem({url}) {
    const { loginUserData } = useAuth()
    
    const [iconPictureUrl, setIconPictureUrl] = useState()
    const [data, setData] = useState({})
    const [id, setId] = useState()
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
            setId(res.id)
            fillStats(res.stats)
            setLoading(false)
        })

        return () => controller.abort()
    }, [url])

    function svg(name) {
        return SVG(name, 20, 20)
    }

    if (loading) return (<>
        <Card>
            <FavouriteButton/>
            <Card.Body>
                <Card.Img variant="top" src={null} className="pokemon-icon"/>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
        </Card>
    </>)

    function isFavourite() {
        if (!loginUserData) return false;
        return loginUserData.favourite_pokemons.includes(data.id);
    }

    return (
        <Card>
            <FavouriteButton id={id} defaultValue={isFavourite()} />
            <Card.Img variant="top" src={iconPictureUrl} className="pokemon-icon"/>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>

                <ListGroup className="d-flex justify-content-around flex-row">
                        {stats.hp && <div className="stat-param">{svg("health")} <span>{stats.hp.base_stat}</span></div>}
                        {stats.attack && <div className="stat-param">{svg("sword")} <span>{stats.attack.base_stat}</span></div>}
                        {stats.defense && <div className="stat-param">{svg("shield")} <span>{stats.defense.base_stat}</span></div>}
                </ListGroup>
                <ListGroup className="list-group-flush">
                    
                    
                    <ListGroupItem>Number of abilities: {data.abilities.length}</ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>

    )
}