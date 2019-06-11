//-------------------------------- external API-------------------------------//

const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json'

const fetchAllMakeup = () =>{
    return fetch(BASE_URL)
        .then(resp => resp.json())}

const fetchBlushProducts = () => {
    return fetch(`${BASE_URL}?product_type=blush`)
        .then(resp => resp.json())}

const fetchBronzerProducts = () => {
    return fetch(`${BASE_URL}?product_type=bronzer`)
        .then(resp => resp.json())}

const fetchEyesProducts = () => {
    return fetch(`${BASE_URL}?product_type=eyeshadow`)
        .then(resp => resp.json())}

const fetchFoundationProducts = () => {
    return fetch(`${BASE_URL}?product_type=foundation`)
        .then(resp => resp.json())}

const fetchLipsProducts = () => {
    return fetch(`${BASE_URL}?product_type=lipstick`)
        .then(resp => resp.json())}

const fetchMascaraProducts = () => {
    return fetch(`${BASE_URL}?product_type=mascara`)
        .then(resp => resp.json())}

//-------------------------------- my rails API-------------------------------//

const RAILS_BASE_URL = 