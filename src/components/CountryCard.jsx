import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/countrycard.scss';

function CountryCard() {
    return (
        <div className='country-card-container'>
            <div className="country-card">
                <div className="card-front">
                    <div className="country-card-image">
                        <button className="favorite-btn">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <img src="https://flagcdn.com/w320/rs.png" alt="Zastava" />
                    </div>
                    <div className="country-card-info">
                        <h2>Country Name</h2>
                        <p>Population: 7,000,000</p>
                        <p>Region: Europe</p>
                        <p>Subregion: Southern Europe</p>
                        <p>Capital: Belgrade</p>
                        <p>Language: Serbian</p>
                        <p>Currencies: Serbian dinar (RSD)</p>
                    </div>
                </div>
                <div className="card-back">
                    <button className="favorite-btn">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <h2>Country Name</h2>
                    <div className='desc-container'>
                        <div className='desc-cont-inner'>
                            <p className='desc-text'>
                                Ovo je primer opisa koji bi došao sa Wikipedije. 
                                Ovde testiraš kako tekst leži u kontejneru i da li radi scroll.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryCard;