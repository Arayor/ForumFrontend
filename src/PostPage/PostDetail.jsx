import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago'
import { postActions } from '../_actions';
import ReactHtmlParser from 'react-html-parser';
import { CommentCreate } from './CommentCreate';
function PostDetail(props) {
    const comments = useSelector(state => state.comments);
    const idPost = props.match.params.id
    const dispatch = useDispatch();
    let post = useSelector(state => state.posts?.items?.find(e => e.id == idPost))

    useEffect(() => {
        dispatch(postActions.getById(idPost));
        dispatch(postActions.getComments(idPost));
    }, []);

    return (
        <div className="">
            {post &&
                <div className="card m-3" key={post.id}>
                    <div className="card-header">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-stopwatch mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07A7.001 7.001 0 0 1 8 16 7 7 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3zm0 2.1a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        <TimeAgo date={post.created_at} />
                    </div>
                    <div className="card-body">
                        <h5>{post.title}</h5>
                    </div>
                    <div className="card-footer">{ReactHtmlParser(post.content)}</div>
                </div>
            }
            {comments.loading && <em>Loading post...</em>}
            {comments.error && <span className="text-danger">ERROR: {comments.error}</span>}
            {comments.items &&
                <section>
                    <h3>Comments:</h3>
                    {comments.items.map((comment, index) =>
                        <div className="card m-3" key={comment.id}>
                            <div className="card-header">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-stopwatch mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07A7.001 7.001 0 0 1 8 16 7 7 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3zm0 2.1a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                <TimeAgo date={comment.created_at} />
                            </div>
                            <div className="card-body">
                                {ReactHtmlParser(comment.content)}
                            </div>
                        </div>
                    )}
                </section>
            }
            <CommentCreate idPost={idPost}></CommentCreate>

        </div>
    );
}

export { PostDetail };