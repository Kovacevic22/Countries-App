import { createContext, useState, useContext, useEffect } from "react";

const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);
export const FavoriteProvider = ({children}) => {

    const [favorites, setFavorites] = useState([]);
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites");
        if(storedFavs) setFavorites(JSON.parse(storedFavs));
    },[])
    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites]);
    const addToFavorites = (country) =>{
        setFavorites(prev => [...prev,country]);
    }
    const removeFavorites = (countryId) =>{
        setFavorites(prev => prev.filter(country=>country.cca3!==countryId));
    }
    const isFavorite = (countryId) => {
        return favorites.some(country=>country.cca3 === countryId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFavorites,
        isFavorite
    }

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}