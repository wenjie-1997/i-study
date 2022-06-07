import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorState, onChange, readOnly }) => {
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      editorStyle={{
        ...(!readOnly && {
          border: "1px solid lightgrey",
          margin: "0px 0px 20px 0px",
          height: "100px",
        }),
      }}
      onEditorStateChange={onChange}
      toolbarHidden={readOnly}
      readOnly={readOnly}
    />
  );
};

export default RichTextEditor;
