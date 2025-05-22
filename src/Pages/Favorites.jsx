import '../styles/favorites.scss';
import '../styles/countrycard.scss';
import CountryCard from '../components/CountryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useFavoriteContext } from '../contexts/FavoriteContext';
function Favorites() {

    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };

    const {favorites} = useFavoriteContext();

    if(favorites){
        return(
            <>
            <button className='home-btn' onClick={handleHome} aria-label="Go to home"><FontAwesomeIcon icon={faHouse}/></button>
            <div className='favorites-container'>
                <h1>Your Favorites</h1>
                {favorites.length === 0 ? <p>You don't have favorite country!</p> : null}
            </div>
            <div className='country-card-container'>
                    {favorites.map((country) => (
                        <CountryCard key={country.name.common} country={country}/>
                    ))}
            </div>
            </>
        );
    }
}
export default Favorites;