const BASE_URL = 'https://restcountries.com/v3.1/all';
const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

export const fetchCountries = async () =>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
}

export const fetchCountryByName = async (name) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    const data = await response.json();
    return data;
}

export const fetchWikipediaDesc = async(name) =>{
    const response = await fetch(`${WIKIPEDIA_BASE_URL}${encodeURIComponent(name)}`);
    const data = await response.json();
    return data;
}