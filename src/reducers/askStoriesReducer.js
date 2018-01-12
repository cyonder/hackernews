import {
    FETCH_ASK_STORIES,
    FETCH_ASK_STORIES_SUCCESS,
    FETCH_ASK_STORIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
    askStories:[],
    askStoriesAmount: null,
    loading: false,
    error: null
}

export default function askStoriesReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_ASK_STORIES:
            return {...state, askStories: [],
                              error: null,
                              loading: true,
                              askStoriesAmount: action.payload};
        case FETCH_ASK_STORIES_SUCCESS:
            return {...state, askStories: [ ...state.askStories, ...action.payload ],
                              error: null,
                              loading: false};
        case FETCH_ASK_STORIES_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, askStories: [],
                              error: error,
                              loading: false,
                              askStoriesAmount: null};
        default:
            return state;
    }
}
