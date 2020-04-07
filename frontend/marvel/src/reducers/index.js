import { 
    GET_SUPERHEROES_SUCCESS,
    GET_HERO_DETAILS_SUCCESS,
    FETCH_DATA_START,
    TOGGLE_HERO_DETAILS,
} from '../actions';

let defaultState = {
    heroes: []
}

const mainReducer = (state=defaultState, action) => {
    switch(action.type) {
    case FETCH_DATA_START:
        return {
            ...state,
            isLoading: true,
        };
    case TOGGLE_HERO_DETAILS:
        const heroId = action.heroId;
        let collapsedHeroes = state.heroes.map((hero) => {
            if(hero.id === heroId) {
                hero.isCollapsed = !hero.isCollapsed;
            }
            return hero;
        })
        return {
            ...state,
            heroes: collapsedHeroes
        };
    case GET_SUPERHEROES_SUCCESS:
        let mappedHeroes = action.heroes.map((hero) => {
            hero.isCollapsed = false;
            return hero;
        });
        return {
            ...state,
            isLoading: false,
            heroes: mappedHeroes
        };
    case GET_HERO_DETAILS_SUCCESS:
        let newHeroes = state.heroes.map((singleHero) => {
            if(singleHero.id === action.details.id) {
                singleHero.details = action.details;
            }
            return singleHero;
        });

        return {
            ...state,
            isLoading: false,
            heroes: newHeroes
        };
    default: 
        return {
            ...state
        };
    }
    
}

export default mainReducer;