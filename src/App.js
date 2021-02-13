import React , {useState , useEffect} from 'react';
import {getAllPokemon, getPokemon} from './Service/pokemon';
import Card from './Components/card/Card';
import style from './Components/card/style.css';
import loadingScreen from './Service/loading';
import Navbar from './Components/Navbar/Navbar';


function App() {

  const [pokemonData , setPokemonData ] = useState();
  const [loading , setLoading] = useState(true);
  const [nextUrl , setnextUrl] = useState('');
  const [preUrl , setpreUrl] = useState('');
  const initalUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() =>{
    async function fetchData() {
      let response = await getAllPokemon(initalUrl);
      setnextUrl(response.next);
      setpreUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      setLoading(false);
    } 
    fetchData();
  },[]);

  const next = async() => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setnextUrl(data.next);
    setpreUrl(data.previous);
    setLoading(false);
  }

  const prev = async() => {
    if(!preUrl) return;
    setLoading(true);
    let data = await getAllPokemon(preUrl)
    await loadingPokemon(data.results)
    setnextUrl(data.next);
    setpreUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async(data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))

    setPokemonData(_pokemonData);
  }
  return (
    <div>

      {loading ?  
      <div>
        {loadingScreen()}
      </div> : 
      <div className="Main">
        <Navbar />
        <div className="btn">
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
        </div>
        <div className="card_container">
        
          {
            pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })
          }
        </div>

        <div className="btn below">
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
        </div>
        
      </div>
      } 
    </div>
  );
}

export default App;
