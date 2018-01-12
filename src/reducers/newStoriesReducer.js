import {
    FETCH_NEW_STORIES,
    FETCH_NEW_STORIES_SUCCESS,
    FETCH_NEW_STORIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
    newStories:[],
    newStoriesAmount: null,
    loading: false,
    error: null
}

export default function newStoriesReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_NEW_STORIES:
            return {...state, newStories: [],
                              error: null,
                              loading: true,
                              newStoriesAmount: action.payload};
        case FETCH_NEW_STORIES_SUCCESS:
            return {...state, newStories: [ ...state.newStories, ...action.payload ],
                              error: null,
                              loading: false};
        case FETCH_NEW_STORIES_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, newStories: [],
                              error: error,
                              loading: false,
                              newStoriesAmount: null};
        default:
            return state;
    }
}
