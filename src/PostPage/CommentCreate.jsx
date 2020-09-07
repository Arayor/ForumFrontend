import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { postActions } from '../_actions';

function CommentCreate(props) {
    const [inputs, setInputs] = useState({
        content: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { content } = inputs;
    // const registerPost = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (content) {
            // get return url from location state or default to home page
            await dispatch(postActions.registerComment({ content, post: props.idPost }));
        }
        dispatch(postActions.getComments(props.idPost));
    }

    const handleEditor = (value) => {
        setEditorState(value)
        setInputs(inputs => ({ ...inputs, ['content']: draftToHtml(convertToRaw(value.getCurrentContent())) }));
    }

    return (
        <div >
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName={'form-control' + (submitted && !content ? ' is-invalid' : '')}
                        editorStyle={{ minHeight: 200 }}
                        name="content"
                        onEditorStateChange={handleEditor}
                    />

                    {submitted && !content &&
                        <div className="invalid-feedback">Content is required</div>
                    }
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">
                        {false/*registerPost*/ && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Comment
                    </button>
                    <Link to="/" className="btn btn-link">Back</Link>
                </div>

            </form>
        </div>
    );
}

export { CommentCreate };