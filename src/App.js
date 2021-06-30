import "./styles.css";
import axios from "axios";

import React, { useEffect, useState } from "react";
const baseURL = "https://pokeapi.co/api/v2/";

const filterByStartingLetter = (list, letter) => {
  if (!list) return [];
  return list.filter((name) => name.pokemon.name.startsWith(letter) > 0);
};

const PokemonItem = ({ pokemon }) => <div>{pokemon}</div>;

const getPokemons = async (pokemonType) => {
  const requestURL = baseURL + "type/" + pokemonType;
  const response = await axios.get(requestURL);
  const pokemons = response.data.pokemon;
  const filtered = filterByStartingLetter(pokemons, "s");
  return filtered.map((pokemon) => pokemon.pokemon.name);
};

export default function App() {
  const [queryState, setQueryState] = useState("loading...");
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getPokemons("water")
      .then((pokemons) => {
        setQueryState("completed");
        setPokemons(pokemons);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setQueryState("failed");
      });
  }, []);

  return (
    <div className="App">
      <h1>Water pokemons</h1>
      <p>We need to show a list of pokemons with the following conditions:</p>
      <ul>
        <li>Only show water type pokemons</li>
        <li>Only pokemons starting with the letter "S"</li>
      </ul>
      <p>
        You can use the{" "}
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          poke api
        </a>
      </p>
      <p>
        The result should look something like this{" "}
        <span role="img" aria-label="finger pointing down">
          👇
        </span>
      </p>
      {queryState === "loading" && "Loading"}
      {queryState === "failed" && <>{error}</>}

      <div class="pokemonList">
        {pokemons.map((pokemon) => (
          <PokemonItem key={pokemon} pokemon={pokemon} />
        ))}
        {pokemons.length === 0 && queryState === "completed" && (
          <>No Pokemons found</>
        )}

        <img src="./result.png" alt="" width="500px" />
      </div>
      <p>
        <i>
          Bonus! Replace the PokeAPI endpoint with your own API. <br />
          The API has to be build in Python/Flask!
        </i>
      </p>
    </div>
  );
}
