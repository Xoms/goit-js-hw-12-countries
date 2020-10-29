import debounce from "lodash.debounce";
import CountriesAPIService from './apiService';
import country from '../templates/country.handlebars';

import {notice, error, Stack } from '@pnotify/core';

// const stack = new Stack ({
//     dir1: 'up',
//     context: document.querySelector('.output')
// })
const options = {
    autoOpen: false,
    destroy: false,
    hide: false,
}


const tooMany = notice({
    text: "Уточните запрос, слишко много результатов!",
    ...options
  });

const notFound = error({
    text: "По заданному запросу ничего не найдено!",
    ...options
});


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
        if (!search) {
            this.closeNotice(tooMany);
            this.closeNotice(notFound);
            this.output.innerHTML = '';
            return;
        }
        this.getData(search);
    }

    closeNotice(msg){
        if (msg.getState() === 'open') {
            msg.close();
        }
    }

    getData = (str) => {
        this.api.getCountries(str)
            .then( res => {

                if (res.status === 404) {
                    this.output.innerHTML = '';
                    notFound.open();
                    this.closeNotice(tooMany);
                    
                    return;
                } 

                if (res.length > 10){
                    this.output.innerHTML = '';

                    tooMany.open();
                    this.closeNotice(notFound);
                    
                    return;

                } else if (res.length > 1 && res.length <= 10) {

                    this.closeNotice(notFound);
                    this.closeNotice(tooMany);

                    const ul = document.createElement('ul');
                    ul.innerHTML = res.reduce((acc, el) => acc + `<li>${el.name}</li>`, '');
                    this.output.innerHTML = '';
                    this.output.append(ul);

                } else {
                    this.closeNotice(tooMany);
                    this.closeNotice(notFound);

                    this.output.innerHTML = country(res[0]);
                }
            })
            .catch(err => console.error(err));
    }


}