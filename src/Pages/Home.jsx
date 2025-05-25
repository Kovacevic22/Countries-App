import CountryCard from "../components/CountryCard";
import {useState, useEffect, use} from "react";
import {fetchCountries,fetchCountryByName} from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.scss';
import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();
    const handleFavorites = () => {
        navigate('/favorites');
    };
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 18;
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const data = await fetchCountries();
                setCountries(data);
            }catch(err){
                console.error(err);
                setError("Failed to load countries");
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    useEffect(() => {
        const handleScroll = () =>{
            setShowScrollToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
    /*
    const handleSearch = async(e) => {
        e.preventDefault();
        if(!search.trim())return;
        if(loading)return;
        setLoading(true);
        setError(null);
        setNoResults(false);
        setCurrentPage(1);  
        try{
            const searchResult = await fetchCountryByName(search);
            if(searchResult && searchResult.length > 0){
                setCountries(searchResult);
                setNoResults(false);
            } else {
                setCountries([]);
                setNoResults(true);
            }
        }catch(err){
            console.error(err);
            setError("Failed to load countries");
        }finally{
            setLoading(false);
        }
    }
    */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        if (loading) return;
        setLoading(true);
        setError(null);
        setNoResults(false);
        setCurrentPage(1);

        try {
            const searchResult = await fetchCountryByName(search);
            const filteredResult = searchResult.filter(country =>
                country.name.common.toLowerCase().startsWith(search.toLowerCase())
            );
            if (filteredResult.length > 0) {
                setCountries(filteredResult);
                setNoResults(false);
            } else {
                setCountries([]);
                setNoResults(true);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load countries");
        } finally {
            setLoading(false);
        }
    };
    return(
        <>
            <button className="favorites-btn" onClick={handleFavorites} aria-label="Go to favorites"><FontAwesomeIcon icon={faBookmark} /></button>
            <form onSubmit={handleSearch}>
                <input onChange={(e)=>setSearch(e.target.value)} type="text" name="search" id="search" placeholder="Search..."/>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            {noResults && <p className="noresult-message">No countries found for "{search}"</p>}
            <div className='country-card-container'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {currentCountries.map((country) => (
                    <CountryCard key={country.name.common} country={country}/>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {Math.ceil(countries.length / countriesPerPage)}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(countries.length / countriesPerPage)))}disabled={currentPage === Math.ceil(countries.length / countriesPerPage)}>
                    Next
                </button>
            </div>
            {showScrollToTop &&<button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FontAwesomeIcon icon={faArrowUp} /></button>}
            
        </>
    )
}

export default Home;