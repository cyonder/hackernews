import {
    FETCH_ITEM,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEM_FAILURE
} from '../constants/actionTypes';

const initialState = {
    story: null,
    comments: [],
    commentsAmount: null,
    loading: false,
    error: null
}

export default function itemsReducer(state = initialState, action){
    let error;

    switch(action.type){
        case FETCH_ITEM:
            return { ...state, comments: [],
                               error: null,
                               loading: true,
                               commentsAmount: null,
                               story: action.payload};
        case FETCH_ITEM_SUCCESS:
            return { ...state, comments: [ ...state.comments, ...action.payload.comments ],
                               error: null,
                               loading: false,
                               commentsAmount: action.payload.commentsLength};
        case FETCH_ITEM_FAILURE:
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {...state, comments: [],
                              error: error,
                              loading: false,
                              commentsAmount: null};
        default:
            return state;
    }
}
