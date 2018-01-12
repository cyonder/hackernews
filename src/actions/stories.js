import axios from 'axios';

import { ROOT_API_URL } from '../constants/config';
import {
    FETCH_TOP_STORIES,
    FETCH_TOP_STORIES_SUCCESS,
    FETCH_TOP_STORIES_FAILURE,
    FETCH_NEW_STORIES,
    FETCH_NEW_STORIES_SUCCESS,
    FETCH_NEW_STORIES_FAILURE,
    FETCH_SHOW_STORIES,
    FETCH_SHOW_STORIES_SUCCESS,
    FETCH_SHOW_STORIES_FAILURE,
    FETCH_ASK_STORIES,
    FETCH_ASK_STORIES_SUCCESS,
    FETCH_ASK_STORIES_FAILURE,
    FETCH_JOB_STORIES,
    FETCH_JOB_STORIES_SUCCESS,
    FETCH_JOB_STORIES_FAILURE
} from '../constants/actionTypes';

// Top Stories

export const fetchTopStoriesSuccess = (topStories) => {
    return {
        type: FETCH_TOP_STORIES_SUCCESS,
        payload: topStories
    }
}

export const fetchTopStoriesFailure = (error) => {
    return {
        type: FETCH_TOP_STORIES_FAILURE,
        payload: error
    }
}

export const fetchTopStories = (topStoriesLength) => {
    return {
        type: FETCH_TOP_STORIES,
        payload: topStoriesLength
    }
}

// New Stories

export const fetchNewStoriesSuccess = (newStories) => {
    return {
        type: FETCH_NEW_STORIES_SUCCESS,
        payload: newStories
    }
}

export const fetchNewStoriesFailure = (error) => {
    return {
        type: FETCH_NEW_STORIES_FAILURE,
        payload: error
    }
}

export const fetchNewStories = (newStoriesLength) => {
    return {
        type: FETCH_NEW_STORIES,
        payload: newStoriesLength
    }
}

// show Stories

export const fetchShowStoriesSuccess = (showStories) => {
    return {
        type: FETCH_SHOW_STORIES_SUCCESS,
        payload: showStories
    }
}

export const fetchShowStoriesFailure = (error) => {
    return {
        type: FETCH_SHOW_STORIES_FAILURE,
        payload: error
    }
}

export const fetchShowStories = (showStoriesLength) => {
    return {
        type: FETCH_SHOW_STORIES,
        payload: showStoriesLength
    }
}

// Ask Stories

export const fetchAskStoriesSuccess = (askStories) => {
    return {
        type: FETCH_ASK_STORIES_SUCCESS,
        payload: askStories
    }
}

export const fetchAskStoriesFailure = (error) => {
    return {
        type: FETCH_ASK_STORIES_FAILURE,
        payload: error
    }
}

export const fetchAskStories = (askStoriesLength) => {
    return {
        type: FETCH_ASK_STORIES,
        payload: askStoriesLength
    }
}

// Job Stories

export const fetchJobStoriesSuccess = (jobStories) => {
    return {
        type: FETCH_JOB_STORIES_SUCCESS,
        payload: jobStories
    }
}

export const fetchJobStoriesFailure = (error) => {
    return {
        type: FETCH_JOB_STORIES_FAILURE,
        payload: error
    }
}

export const fetchJobStories = (jobStoriesLength) => {
    return {
        type: FETCH_JOB_STORIES,
        payload: jobStoriesLength
    }
}

export const fetchStories = (pageType, currentPage) => {
    let url;
    let fetchStories;
    let fetchStoriesSuccess;
    let fetchStoriesFailure;
    currentPage = currentPage - 1;

    switch(pageType){
        case 'top':
            url = '/topstories.json';
            fetchStories = fetchTopStories;
            fetchStoriesSuccess = fetchTopStoriesSuccess;
            break;
        case 'new':
            url = '/newstories.json';
            fetchStories = fetchNewStories;
            fetchStoriesSuccess = fetchNewStoriesSuccess;
            break;
        case 'show':
            url = '/showstories.json';
            fetchStories = fetchShowStories;
            fetchStoriesSuccess = fetchShowStoriesSuccess;
            break;
        case 'ask':
            url = '/askstories.json';
            fetchStories = fetchAskStories;
            fetchStoriesSuccess = fetchAskStoriesSuccess;
            break;
        case 'job':
            url = '/jobstories.json';
            fetchStories = fetchJobStories;
            fetchStoriesSuccess = fetchJobStoriesSuccess;
            break;
        default:
            url = '/topstories.json';
            fetchStories = fetchTopStories;
            fetchStoriesSuccess = fetchTopStoriesSuccess;
    }

    return dispatch => {
        return axios.get(`${ROOT_API_URL}${url}`)
            .then(response => {
                let stories = response.data;
                dispatch( fetchStories(stories.length) ); // Set loading true

                let storiesPerPage = 20;
                let promiseArray = [];

                Object.keys(stories).slice(storiesPerPage * currentPage, (storiesPerPage * currentPage) + storiesPerPage).forEach((key, index) => {
                    promiseArray.push(axios.get(`${ROOT_API_URL}/item/${stories[key]}.json`))
                })

                axios.all(promiseArray)
                    .then(response => {
                        let stories = response.map(response => {
                            return response.data
                        })
                        dispatch( fetchStoriesSuccess(stories) ); // Set loading false
                    })
                .catch(error => {
                    // dispatch(fetchStoriesFailure(error));
                    console.log("error: ", error);
                })
            })
            .catch(error => {
                if(error.response.status === 401){
                    console.error("Unauthorized");
                }else{
                    console.error("Something went wrong!");
                }
            })
    }
}
