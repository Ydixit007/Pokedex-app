import React from 'react';
import style from './style.css';
import typeColors from '../../Service/typeColors';

const Card = ({ pokemon }) => {
    return (
            <div className="card" >
                <img className="pokeball" src="./material/pokeball.png" alt=""/>
                <img className="pokemon_image" src={pokemon.sprites.front_default} alt=""/>
                <div className="info_div">
                    <h4 className="pokemon_name">{pokemon.name}</h4>
                    <div className="pokemon_type">
                    {
                    pokemon.types.map(type => {
                        return (
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
                    </div>
                </div>
            </div>
    )
}

export default Card;