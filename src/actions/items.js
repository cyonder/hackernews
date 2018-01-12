import axios from 'axios';

import { ROOT_API_URL } from '../constants/config';
import {
    FETCH_ITEM,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEM_FAILURE
} from '../constants/actionTypes';

export const fetchItemSuccess = (comments, commentsLength) => {
    return {
        type: FETCH_ITEM_SUCCESS,
        payload: {
            comments,
            commentsLength
        }
    }
}

export const fetchItemFailure = (error) => {
    return {
        type: FETCH_ITEM_FAILURE,
        payload: error
    }
}

export const fetchItemContent = (story) => {
    return {
        type: FETCH_ITEM,
        payload: story
    }
}

const generateCommentTree = (comments, parent) => {
    let commentTree = []

    comments.forEach(comment => {
        if(comment.parent === parent){
            let kids = generateCommentTree(comments, comment.id);

            if(kids.length){
                comment.kids = kids;
            }
            commentTree.push(comment)
        }
    })
    return commentTree;
}

export const fetchItem = (id) => {
    return dispatch => {
        return axios.get(`${ROOT_API_URL}/item/${id}.json`)
            .then(response => {
                let story = response.data;
                let commentIds = response.data.kids; // Story kids
                var allComments = [];
                var level = 0;

                dispatch( fetchItemContent(story) ); // Set loading true

                let fetchComments = (commentIdArray) => {
                    level++;
                    let promiseArray = [];

                    // 1. Create requests for each commentId
                    commentIdArray.forEach(commentId => {
                        promiseArray.push(axios.get(`${ROOT_API_URL}/item/${commentId}.json`));
                    })

                    // 2. Make requests to fetch all commentIds
                    axios.all(promiseArray)
                        .then(responseArray => {
                            responseArray.forEach(response => {
                                let comment = response.data;

                                allComments.push(comment);

                                if(comment.kids){
                                    fetchComments(comment.kids, comment.id);
                                }else{
                                    return false;
                                }
                            })
                            level--;

                            if(level === 0){
                                let commentTree = generateCommentTree(allComments, story.id);
                                dispatch( fetchItemSuccess(commentTree, allComments.length) ); // Set loading false
                            }
                        })
                        .catch(error => {
                            console.log("error promise.all: ", error);
                        })
                }

                if(commentIds){ // Fetch comments if there are comments
                    fetchComments(commentIds);
                }
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
