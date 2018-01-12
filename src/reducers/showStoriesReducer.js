import {
    FETCH_SHOW_STORIES,
    FETCH_SHOW_STORIES_SUCCESS,
    FETCH_SHOW_STORIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
    showStories:[],
    showStoriesAmount: null,
    loading: false,
    error: null
}

export default function showStoriesReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_SHOW_STORIES:
            return {...state, showStories: [],
                              error: null,
                              loading: true,
                              showStoriesAmount: action.payload};
        case FETCH_SHOW_STORIES_SUCCESS:
            return {...state, showStories: [ ...state.showStories, ...action.payload ],
                              error: null,
                              loading: false};
        case FETCH_SHOW_STORIES_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, showStories: [],
                              error: error,
                              loading: false,
                              showStoriesAmount: null};
        default:
            return state;
    }
}
