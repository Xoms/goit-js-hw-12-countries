import debounce from "lodash.debounce";
import CountriesAPIService from './apiService';
import country from '../templates/country.handlebars';

export default class Countries {

    search = document.getElementById('search');
    output = document.querySelector('.output');
    countries = [];

    constructor(){
        this.search.addEventListener('input', debounce(this.onInput, 500));
        this.api = new CountriesAPIService;
    }

    onInput = () =>{
        const search = this.search.value;
        this.getData(search);
        
    }

    getData = (str) => {
        this.api.getCountries(str)
            .then( res => {

                if (res.status === 404) {
                    this.output.innerHTML = `По данным критериями страны не найдены`;
                    this.output.classList.add('error');
                    return;
                } 

                if (res.length > 10){
                    this.output.classList.add('error');
                    this.output.innerHTML = `Уточните поисковый запрос`

                } else if (res.length > 1 && res.length <= 10) {
                    const ul = document.createElement('ul');
                    ul.innerHTML = res.reduce((acc, el) => acc +  `<li>${el.name}</li>`, '');
                    this.output.innerHTML = '';
                    this.output.classList.remove('error');
                    this.output.append(ul);

                } else {
                    this.output.classList.remove('error');
                    this.output.innerHTML = country(res[0]);
                }
            })
            .catch(err => console.log(err));
    }


}