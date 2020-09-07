import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (content) {
            dispatch(postActions.registerComment({ content, post: props.idPost }))
            setEditorState(EditorState.createEmpty())
        }
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