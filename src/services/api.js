const BASE_URL = 'https://restcountries.com/v3.1/all';
const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

export const fetchCountries = async () =>{
    const response = await fetch(`${BASE_URL}?fields=name,cca2,cca3,capital,region,subregion,flags,population,languages,currencies`);
    if (!response.ok) return [];
    const data = await response.json().catch(() => []);
    return Array.isArray(data) ? data : [];
}

export const fetchCountryByName = async (name) => {
    const term = (name ?? '').trim();
    if (!term) return [];
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(term)}?fullText=false&fields=name,cca2,cca3,capital,region,subregion,flags,population,languages,currencies`);
    if (!response.ok) return [];
    const data = await response.json().catch(() => []);
    return Array.isArray(data) ? data : [];
}

export const fetchWikipediaDesc = async(name) =>{
    const term = (name ?? '').trim();
    if (!term) return {};
    const response = await fetch(`${WIKIPEDIA_BASE_URL}${encodeURIComponent(term)}`);
    if (!response.ok) return {};
    const data = await response.json().catch(() => ({}));
    return data;
}
