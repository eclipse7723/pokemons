import React, { useState } from "react";
import { SVG } from "../utils";

const FavouriteButton = ({name}) => {

    const [fav, setFav] = useState(false)

    function handleClick() {
        setFav(!fav)
        console.log(`You just click on '${name}'`)
    }

    return (<>
    <button className="favourite-btn" onClick={handleClick}>
        {fav && SVG("favorite-1", 20, 20) || SVG("favorite-0", 20, 20)}
    </button>
    </>)
}

export default FavouriteButton;