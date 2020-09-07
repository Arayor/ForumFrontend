import { postConstants } from '../_constants';

export function comments(state = {}, action) {
    switch (action.type) {
        case postConstants.GET_COMMENTS_REQUEST:
            return {
                loading: true
            };
        case postConstants.GET_COMMENTS_SUCCESS:
            return {
                items: action.comments
            };
        case postConstants.GET_COMMENTS_FAILURE:
            return {
                error: action.error
            };
        case postConstants.REGISTER_COMMENT_REQUEST:
            return {
                loading: true
            };
            
        case postConstants.REGISTER_COMMENT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}