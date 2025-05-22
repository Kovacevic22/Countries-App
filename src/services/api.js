const BASE_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = async () =>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
}

export const fetchCountryByName = async (name) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();
    return data;
}