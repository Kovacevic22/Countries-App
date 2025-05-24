import '../styles/countrycard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {useFavoriteContext} from "../contexts/FavoriteContext"
import {fetchWikipediaDesc} from "../services/api";
import { useState, useEffect } from "react";

function CountryCard({country}) {
    const {isFavorite, addToFavorites, removeFavorites} = useFavoriteContext();
    const favorite = isFavorite(country.cca3);
    const [showDescription, setDescription] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
            const fetchData = async () =>{
                try{
                    const data = await fetchWikipediaDesc(country.name.common);
                    setDescription(data);
                }catch(err){
                    console.log(err);
                    setError("Faild to load description!");
                }finally{
                    setLoading(false);
                }
            }
            fetchData();
    },[]);
    function onFavoriteClick(e){
        e.preventDefault();
        if(favorite) removeFavorites(country.cca3);
        else addToFavorites(country);
    }
    return(
        <div className='country-card-container'>
            <div className="country-card">
                <div className="card-front">
                    <div className="country-card-image">
                        <button className={`favorite-btn ${favorite ? 'active' : ""}`} onClick={onFavoriteClick}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <img src={country.flags?.png} alt={`${country.name.common}`} />
                    </div>
                    <div className="country-card-info">
                        <h2>{country.name.common}</h2>
                        <p>Population: {country.population.toLocaleString()}</p>
                        <p>Region: {country.region}</p>
                        <p>Subregion: {country.subregion}</p>
                        <p>Capital: {country.capital}</p>
                        <p>Language: {country.languages ? Object.values(country.languages).join(', '): 'Unknown'}</p>
                        <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c=> `${c.name} (${c.symbol})`).join(', '):'Unknown'}</p>
                    </div>
                </div>
                <div className="card-back">
                    <button className={`favorite-btn ${favorite ? 'active' : ""}`} onClick={onFavoriteClick}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <h2>{country.name.common}</h2>
                    {loading && <p>Loading description...</p>}
                    {error && <p>{error}</p>}
                    <div className='desc-container'>
                        <div className='desc-cont-inner'>
                            {!loading && !error && (
                            <p className='desc-text'>{showDescription?.extract || "No description available."}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryCard;