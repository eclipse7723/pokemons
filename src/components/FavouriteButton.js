import React, { useState, useEffect } from "react";
import { SVG } from "../utils";
import { useAuth } from "../contexts/AuthContext";
import { updateUserParams } from "../services/firestore";

const FavouriteButton = ({defaultValue, id}) => {
    const { currentUser, loginUserData, updateLoginUserData } = useAuth()
    const [fav, setFav] = useState(defaultValue)

    async function updateFavouritePokemon() {
        updateLoginUserData()
        let favList = loginUserData.favourite_pokemons

        if (favList.includes(id)) {
            favList.splice(favList.indexOf(id), 1)
            setFav(false)
        } else {
            favList.push(id)
            setFav(true)
        }
        await updateUserParams(currentUser.uid, {favourite_pokemons: favList})
        updateLoginUserData()
    }
    
    async function handleClick() {
        await updateFavouritePokemon()
        await updateLoginUserData()
    }

    useEffect(() => {
        setFav(defaultValue)
    }, [defaultValue])
    
    if (!loginUserData) return;

    return (<>
    <button className="favourite-btn" onClick={handleClick}>
        {(fav && SVG("favorite-1", 20, 20)) || SVG("favorite-0", 20, 20)}
    </button>
    </>)
}

export default FavouriteButton;