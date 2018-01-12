import { FETCH_USER } from '../constants/actionTypes';

const initialState = {
    about: null,
    created: null,
    id: null,
    karma: null,
    submitted: []
}

export default function usersReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_USER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
