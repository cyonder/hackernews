import { combineReducers } from 'redux';

import topStoriesReducer from './topStoriesReducer';
import newStoriesReducer from './newStoriesReducer';
import showStoriesReducer from './showStoriesReducer';
import askStoriesReducer from './askStoriesReducer';
import jobStoriesReducer from './jobStoriesReducer';
import usersReducer from './usersReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
    topStoriesList: topStoriesReducer,
    newStoriesList: newStoriesReducer,
    showStoriesList: showStoriesReducer,
    askStoriesList: askStoriesReducer,
    jobStoriesList: jobStoriesReducer,
    user: usersReducer,
    item: itemsReducer,
});

export default rootReducer;
