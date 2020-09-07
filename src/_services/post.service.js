import config from 'config';

export const postService = {
    register,
    getAll,
    getById,
    getComments,
    registerComment
    //    update,
    //    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/posts/`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/posts/${id}`, requestOptions).then(handleResponse);
}

function register(post) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    };

    return fetch(`${config.apiUrl}/posts/`, requestOptions).then(handleResponse);
}

function getComments(id) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/posts/${id}/comments`, requestOptions).then(handleResponse);
}

function registerComment(comment) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };

    return fetch(`${config.apiUrl}/posts/${comment.post}/comments`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}