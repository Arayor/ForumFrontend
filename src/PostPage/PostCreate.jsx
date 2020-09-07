import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { postActions } from '../_actions';

function PostCreate() {
    const [inputs, setInputs] = useState({
        title: '',
        content: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { title, content } = inputs;
    const dispatch = useDispatch();


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (title && content) {
            dispatch(postActions.register({title, content}));
        }
    }

    const handleEditor = (value) => {
        setEditorState(value)
        setInputs(inputs => ({ ...inputs, ['content']: draftToHtml(convertToRaw(value.getCurrentContent())) }));
    }

    return (
        <div className="">
            <h2>Create Post</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={handleChange} className={'form-control' + (submitted && !title ? ' is-invalid' : '')} />
                    {submitted && !title &&
                        <div className="invalid-feedback">Title is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Content</label>
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
                        Create
                    </button>
                    <Link to="/" className="btn btn-link">Back</Link>
                </div>
                
            </form>
        </div>
    );
}

export { PostCreate };