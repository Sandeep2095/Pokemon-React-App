import { useState } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState(
    {
      name: "",
      species: "",
      img: "",
      hp: "",
      attack: "",
      defense: "",
      type: "",
    });

  const searchPokemon = () => {
    var name = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      })

  }
  return (
    <div className="App">
      <div className="titlesection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={pokemonName}
          onChange={(event) => {
            setPokemonName(event.target.value)

          }}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="display">
        {!pokemonChosen ? (
          <h1>Your Pokemon</h1>
        ) : (
          <>
            <h1>{'Your Pokemon'}</h1>
            <img src={pokemon.img} />
            <h3>Name:    {pokemon.species}</h3>
            <h3>Type:    {pokemon.type}</h3>
            <h4>Hp:      {pokemon.hp}</h4>
            <h4>Attack:  {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div >
  );
}

export default App;
