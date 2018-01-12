import axios from 'axios';

import { ROOT_API_URL } from '../constants/config';
import { FETCH_USER } from '../constants/actionTypes';

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER,
        payload: user
    }
}

export const fetchUser = (id) => {
    return dispatch => {
        return axios.get(`${ROOT_API_URL}/user/${id}.json`)
            .then(response => {
                let user = response.data;
                dispatch( fetchUserSuccess(user) );
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
