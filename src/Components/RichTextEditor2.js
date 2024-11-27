import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor1({ note_2_db, isLoading_2, valNote_2, setFlag_2 }) {

    // Initialize editorState with the appropriate content
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const contentState = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        setFlag_2(true);
        valNote_2.current = rawContent;
    };

    useEffect(() => {
        if (note_2_db?.blocks && !isLoading_2) {
            valNote_2.current = note_2_db;
            const contentState = convertFromRaw(note_2_db);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        } else {
            setEditorState(EditorState.createEmpty());
            valNote_2.current = EditorState.createEmpty();
        }

        return () => {
            setFlag_2(false);
        };
    }, [note_2_db, isLoading_2, valNote_2, setFlag_2]);
    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={(newState) => {
                    setEditorState(newState);
                    contentState();
                }}
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'], // Remove 'image'
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                spellCheck
            />
        </div>
    );
}

export default RichTextEditor1;
