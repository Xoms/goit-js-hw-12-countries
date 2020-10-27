export default class CountriesAPIService {

    API_URL = `https://restcountries.eu/rest/v2/`;
    ENDPOINT = `name/`

    constructor(){
    }

    getCountries(str){
        const filters = `?fields=name;capital;population;languages;flag`
        return fetch(`${this.API_URL}${this.ENDPOINT}${str}${filters}`).then(res => res.json());
    }


}