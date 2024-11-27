import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor1({ note_1_db, isLoading_1, valNote_1, setFlag_1, refetch_1 }) {

    // Initialize editorState with the appropriate content
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const contentState = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        setFlag_1(true);
        valNote_1.current = rawContent;
    };

    useEffect(() => {
        if (note_1_db?.blocks && !isLoading_1) {
            valNote_1.current = note_1_db;
            const contentState = convertFromRaw(note_1_db);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        } else {
            setEditorState(EditorState.createEmpty());
            valNote_1.current = EditorState.createEmpty();
        }

        return () => {
            setFlag_1(false);
        };
    }, [note_1_db, isLoading_1, valNote_1, setFlag_1]);
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
