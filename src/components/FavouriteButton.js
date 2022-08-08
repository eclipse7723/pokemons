import React, { useState, useEffect } from "react";
import { SVG } from "../utils";

const FavouriteButton = ({defaultValue, id, updateFavourite}) => {
    // defaultValue should be useState value
    const [fav, setFav] = useState(defaultValue)
    
    function handleClick() {
        let newState = !fav

        setFav(newState)
        if (typeof(updateFavourite) === 'function') updateFavourite(newState)
        console.log(`You just click on '${id}': ${newState}, fav=${fav}`)
    }

    useEffect(() => {
        setFav(defaultValue)
    }, [defaultValue])
    
    return (<>
    <button className="favourite-btn" onClick={handleClick}>
        {(fav && SVG("favorite-1", 20, 20)) || SVG("favorite-0", 20, 20)}
    </button>
    </>)
}

export default FavouriteButton;