import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import RichTextEditor from "../../common/RichTextEditor";
import Form from "react-bootstrap/esm/Form";
import CommonFormGroup from "../../common/CommonFormGroup";
import * as topicComponentSelectors from "../../../selectors/topicComponent";
import {
  getCurrentLocalISOString,
  getDateTimeLocalString,
} from "../../../utilities/helper";

const TopicComponentModal = ({
  showModal,
  onCloseModal,
  onAddTopicComponent,
  isEditing,
  editingTopicComponent,
  onUpdateTopicComponent,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [componentType, setComponentType] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!showModal) {
      setEditorState(() => EditorState.createEmpty());
      setFile("");
      setTitle("");
      setDescription("");
      setComponentType("");
    }
  }, [showModal]);

  useEffect(() => {
    if (isEditing) {
      setComponentType(
        topicComponentSelectors.getComponentType(editingTopicComponent)
      );
      if (
        topicComponentSelectors.getComponentType(editingTopicComponent) === 1
      ) {
        const content = JSON.parse(
          topicComponentSelectors.getcontent(editingTopicComponent)
        );
        setEditorState(() =>
          EditorState.createWithContent(convertFromRaw(content))
        );
      }
      if (
        topicComponentSelectors.getComponentType(editingTopicComponent) === 3 ||
        topicComponentSelectors.getComponentType(editingTopicComponent) === 4
      ) {
        setTitle(topicComponentSelectors.getTitle(editingTopicComponent));
        setDescription(
          topicComponentSelectors.getDescription(editingTopicComponent)
        );
        if (
          topicComponentSelectors.getComponentType(editingTopicComponent) === 4
        )
          setDueDate(topicComponentSelectors.getDueDate(editingTopicComponent));
      }
    }
  }, [isEditing, editingTopicComponent]);

  useEffect(() => {
    if (!isEditing) {
      setEditorState(() => EditorState.createEmpty());
      setFile("");
    }
  }, [componentType]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (componentType === 1) {
      if (!isEditing)
        onAddTopicComponent({
          componentType,
          content: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        });
      else {
        onUpdateTopicComponent({
          ...editingTopicComponent,
          content: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        });
      }
    }
    if (componentType === 2) {
      if (!isEditing) {
        onAddTopicComponent({
          componentType,
          file,
        });
      } else {
        onUpdateTopicComponent({
          ...editingTopicComponent,
          file,
        });
      }
    }
    if (componentType === 3) {
      if (!isEditing) {
        onAddTopicComponent({
          componentType,
          title,
          description,
          dueDate,
        });
      } else {
        onUpdateTopicComponent({
          ...editingTopicComponent,
          title,
          description,
        });
      }
    }
    if (componentType === 4) {
      if (!isEditing) {
        onAddTopicComponent({
          componentType,
          title,
          description,
          dueDate,
        });
      } else {
        onUpdateTopicComponent({
          ...editingTopicComponent,
          title,
          description,
          dueDate,
        });
      }
    }
  };

  return (
    <Modal show={showModal} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header>
          {isEditing ? "Edit Component" : "Add Component"}
        </Modal.Header>
        <Modal.Body>
          <CommonFormGroup>
            <Form.Label>Component Type</Form.Label>
            <Form.Select
              required
              value={componentType}
              onChange={(e) => setComponentType(parseInt(e.target.value) || "")}
              disabled={isEditing}
            >
              <option value=""> -- Please select one --</option>
              <option value="1">Text</option>
              <option value="2">File Upload</option>
              <option value="3">Forum</option>
              <option value="4">Submission</option>
            </Form.Select>
          </CommonFormGroup>
          {componentType === 1 && (
            <RichTextEditor
              editorState={editorState}
              onChange={setEditorState}
            />
          )}
          {componentType === 2 && (
            <CommonFormGroup>
              <Form.Label>
                {isEditing ? "Re-upload" : "Upload"} the material
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </CommonFormGroup>
          )}
          {(componentType === 3 || componentType === 4) && (
            <>
              <CommonFormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </CommonFormGroup>

              {componentType === 4 && (
                <CommonFormGroup>
                  <Form.Label>Due date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onChange={(e) => {
                      setDueDate(e.target.value + "Z");
                    }}
                    value={dueDate ? getDateTimeLocalString(dueDate) : ""}
                    min={getCurrentLocalISOString()}
                    required
                  />
                </CommonFormGroup>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TopicComponentModal;
