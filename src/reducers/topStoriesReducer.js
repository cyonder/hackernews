import {
    FETCH_TOP_STORIES,
    FETCH_TOP_STORIES_SUCCESS,
    FETCH_TOP_STORIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
    topStories:[],
    topStoriesAmount: null,
    loading: false,
    error: null
}

export default function topStoriesReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_TOP_STORIES:
            return {...state, topStories: [],
                              error: null,
                              loading: true,
                              topStoriesAmount: action.payload};
        case FETCH_TOP_STORIES_SUCCESS:
            return {...state, topStories: [ ...state.topStories, ...action.payload ],
                              error: null,
                              loading: false};
        case FETCH_TOP_STORIES_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, topStories: [],
                              error: error,
                              loading: false,
                              topStoriesAmount: null};
        default:
            return state;
    }
}
