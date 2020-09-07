import { combineReducers } from 'redux';

import { posts } from './posts.reducer';
import { comments } from './comments.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({

    alert,
    posts,
    comments
});

export default rootReducer;