import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago'
import { postActions } from '../_actions';

function PostPage() {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getAll());
    }, []);

    return (
        <div className="">
            <p>
                <Link to="/post" className="btn btn-primary" >
                    Create Post
                    <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" className="bi bi-plus-circle ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>

                </Link>
            </p>
            {posts.loading && <em>Loading posts...</em>}
            {posts.error && <span className="text-danger">ERROR: {posts.error}</span>}
            {posts.items &&
                <section>
                    {posts.items.map((post, index) =>
                        <div className="card m-3" key={post.id}>
                            <div className="card-header">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-stopwatch mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07A7.001 7.001 0 0 1 8 16 7 7 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3zm0 2.1a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                <TimeAgo date={post.created_at} />
                            </div>
                            <div className="card-body">
                                <Link to={"/post/" + post.id} className="btn btn-link" >
                                    <h5>{post.title}
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z" />
                                        </svg>
                                    </h5>
                                </Link>
                            </div>
                            <div className="card-footer">Comments()</div>
                        </div>
                    )}
                </section>
            }

        </div>
    );
}

export { PostPage };