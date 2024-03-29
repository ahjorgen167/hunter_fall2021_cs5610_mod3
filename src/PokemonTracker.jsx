import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function PokemonTracker(props) {
    const navigate = useNavigate();
    const [pokemonForm, setPokemonForm] = useState({
        name: '',
        type: '',
        health: '',
    });
    const [myPokemon, setMyPokemon] = useState([])

    

    function getMyPokemon() {
        axios.get('/api/pokemon/myPokemon')
            .then(response => setMyPokemon(response.data))
            .catch(error => console.log(error))

    }

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success"))
            .catch(() => navigate('/'))
    }
    useEffect(checkLogin, []);

    useEffect(getMyPokemon, []);


    const pokemonElement = [];
    for(let pokemon of myPokemon) {
        pokemonElement.push(<div>{pokemon.name} - {pokemon.health} - {pokemon.type}</div>);
    }


    return (
        <div>
            <h5>Pokemon Name:</h5>
            <input value={pokemonForm.name} 
            onChange={e => setPokemonForm({
                ...pokemonForm,
                name: e.target.value
            })} ></input>
            <h5>Type:</h5>
            <input value={pokemonForm.type} 
            onChange={e => setPokemonForm({
                ...pokemonForm,
                type: e.target.value
            })} ></input>
            <h5>Health:</h5>
            <input value={pokemonForm.health} type="number"
            onChange={e => setPokemonForm({
                ...pokemonForm,
                health: e.target.value
            })} ></input>
            <button onClick={
                () => axios.post('/api/pokemon/create', pokemonForm)
                    .then(response => {
                        getMyPokemon()
                        console.log(response)
                    })
                    .catch(error => console.error(error))
            }>
                Submit
            </button>
            {pokemonElement}
        </div>
    )


}