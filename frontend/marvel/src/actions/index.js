import axios from 'axios';

export const GET_SUPERHEROES_SUCCESS = 'GET_SUPERHEROES_SUCCESS';
export const GET_HERO_DETAILS_SUCCESS = 'GET_HERO_DETAILS_SUCCESS';
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const TOGGLE_HERO_DETAILS = 'TOGGLE_HERO_DETAILS';

export function getSuperheroes() {
    return(dispatch) => {
        dispatch({ type: FETCH_DATA_START });
        return axios.get('http://127.0.0.1:8000/superhero/all')
            .then((response) => {
                dispatch(getSuperheroesSuccess(response.data.superheroes));
            });
    }
}

export function getHeroDetails(id) {
    return(dispatch) => {
        dispatch({ type: FETCH_DATA_START });
        return axios.get(`http://127.0.0.1:8000/superhero/${id}`)
            .then((response) => {
                dispatch(getHeroDetailsSuccess(response.data));
            });
    }
}

export function toggleHeroDetails(id) {
    return(dispatch) => {
        return dispatch(toggleHeroDetailsSuccess(id));
    }
}

export function getSuperheroesSuccess(heroes) {
    return {
        type: GET_SUPERHEROES_SUCCESS,
        heroes: heroes
    }
}

export function getHeroDetailsSuccess(details) {
    return {
        type: GET_HERO_DETAILS_SUCCESS,
        details: details
    }
}

export function toggleHeroDetailsSuccess(heroId) {
    return {
        type: TOGGLE_HERO_DETAILS,
        heroId: heroId
    }
}