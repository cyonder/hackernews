import {
    FETCH_JOB_STORIES,
    FETCH_JOB_STORIES_SUCCESS,
    FETCH_JOB_STORIES_FAILURE
} from '../constants/actionTypes';

const initialState = {
    jobStories:[],
    jobStoriesAmount: null,
    loading: false,
    error: null
}

export default function jobStoriesReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_JOB_STORIES:
            return {...state, jobStories: [],
                              error: null,
                              loading: true,
                              jobStoriesAmount: action.payload};
        case FETCH_JOB_STORIES_SUCCESS:
            return {...state, jobStories: [ ...state.jobStories, ...action.payload ],
                              error: null,
                              loading: false};
        case FETCH_JOB_STORIES_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, jobStories: [],
                              error: error,
                              loading: false,
                              jobStoriesAmount: null};
        default:
            return state;
    }
}
