import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.scss';

function Home() {
    return (
        <>
            {/* Dugme za favorite */}
            <button className="favorites-btn" aria-label="Go to favorites">
                <FontAwesomeIcon icon={faBookmark} />
            </button>

            {/* Search Forma */}
            <form className="search-form">
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Search..."
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>

            {/* Container koji će kasnije držati kartice - sada prazan za dizajn */}
            <div className='country-card-container'>
                {/* Ovde će ići CountryCard komponente */}
                <p style={{textAlign: 'center', width: '100%', color: '#aaa'}}>
                    Card container area (Design mode)
                </p>
            </div>

            {/* Pagination dizajn */}
            <div className="pagination">
                <button disabled>Prev</button>
                <span>Page 1 of 10</span>
                <button>Next</button>
            </div>

            {/* Back to top dugme (vidljivo u dizajnu) */}
            <button className="back-to-top">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </>
    );
}

export default Home;