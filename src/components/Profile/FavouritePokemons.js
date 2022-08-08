import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import PokemonSpecificList from '../PokemonList/PokemonsSpecificList'


export default function FavouritePokemons() {
  const {loginUserData} = useAuth()

  return (
      <>
      
      { (loginUserData.favourite_pokemons.length === 0 && <p>You haven't favourite pokemons :'(</p>)
        || <PokemonSpecificList pokemonsIds={loginUserData.favourite_pokemons} /> }

      </>
  )
}
