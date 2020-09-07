import { postConstants } from '../_constants';
import { postService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const postActions = {
    register,
    getAll,
    getById,
    getComments,
    registerComment
    //    delete: _delete
};

function register(post) {
    return dispatch => {
        dispatch(request(post));

        postService.register(post)
            .then(
                post => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Create post successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(post) { return { type: postConstants.REGISTER_REQUEST, post } }
    function success(post) { return { type: postConstants.REGISTER_SUCCESS, post } }
    function failure(error) { return { type: postConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        postService.getById(id)
            .then(
                post => dispatch(success(post)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_ONE_REQUEST } }
    function success(post) { return { type: postConstants.GET_ONE_SUCCESS, post } }
    function failure(error) { return { type: postConstants.GET_ONE_FAILURE, error } }
}

function getComments(id) {
    return dispatch => {
        dispatch(request());

        postService.getComments(id)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_COMMENTS_REQUEST } }
    function success(comments) { return { type: postConstants.GET_COMMENTS_SUCCESS, comments } }
    function failure(error) { return { type: postConstants.GET_COMMENTS_FAILURE, error } }
}

function registerComment(comment) {
    return dispatch => {
        dispatch(request(comment));

        postService.registerComment(comment)
            .then(
                post => {
                    dispatch(success());
                   // router.push({ pathname: "/empty" });
                   // router.replace({ pathname: "/post/"+comment.post });
                    dispatch(alertActions.success('Create comment successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(comment) { return { type: postConstants.REGISTER_COMMENT_REQUEST, comment } }
    function success(comment) { return { type: postConstants.REGISTER_COMMENT_SUCCESS, comment } }
    function failure(error) { return { type: postConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }