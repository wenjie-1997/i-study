import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTopic,
  addTopicComponent,
  deleteTopic,
  deleteTopicComponent,
  getTopicList,
  updateTopic,
  updateTopicComponent,
} from "../../thunks/topic";
import * as subjectSelectors from "../../selectors/subject";
import * as classSelectors from "../../selectors/class";
import * as topicSelectors from "../../selectors/topic";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import { useNavigate, useParams } from "react-router-dom";
import ComponentCard from "../common/ComponentCard";
import TopicModal from "./components/TopicModal";
import { IoAddCircleOutline } from "react-icons/io5";
import TopicComponentModal from "./components/TopicComponentModal";
import RichTextEditor from "../common/RichTextEditor";
import { convertFromRaw, EditorState } from "draft-js";
import { IoTrash } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";

const ViewTeacherSubject = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showTopicComponentModal, setShowTopicComponentModal] = useState(false);
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingTopicComponent, setIsEditingTopicComponent] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingTopicComponent, setEditingTopicComponent] = useState(null);

  const topicModal = useSelector((state) => state.topic);
  const topicList = [...topicSelectors.getTopicList(topicModal)];
  const onAddTopic = (newTopic) => {
    const { name } = newTopic;
    if (isEditingTopic) {
      dispatch(
        updateTopic({
          ...newTopic,
          classSubjectId: params.class_subject_id,
          closeAddTopicModal: () => setShowAddTopicModal(false),
        })
      );
    } else
      dispatch(
        addTopic({
          name,
          arrangement: topicList.length + 1,
          classSubjectId: params.class_subject_id,
          closeAddTopicModal: () => setShowAddTopicModal(false),
        })
      );
  };

  const onDeleteTopic = (topic) => {
    if (
      window.confirm(
        `Do you wish to delete the topic "${topicSelectors.getName(topic)}"?`
      )
    )
      dispatch(
        deleteTopic({
          topicId: topicSelectors.getTopicId(topic),
          classSubjectId: params.class_subject_id,
        })
      );
  };
  const onAddTopicComponent = (topicComponent) => {
    dispatch(
      addTopicComponent({
        topicId: topicSelectors.getTopicId(editingTopic),
        classSubjectId: params.class_subject_id,
        classId: classSelectors.getClassId(subject),
        ...topicComponent,
        closeTopicComponentModal: () => setShowTopicComponentModal(false),
      })
    );
  };

  const onUpdateTopicComponent = (topicComponent) => {
    dispatch(
      updateTopicComponent({
        classSubjectId: params.class_subject_id,
        ...topicComponent,
        closeTopicComponentModal: () => {
          setIsEditingTopicComponent(false);
          setShowTopicComponentModal(false);
        },
      })
    );
  };

  const onDeleteTopicComponent = (topicComponent) => {
    if (window.confirm("Are you sure to delete the topic component?")) {
      dispatch(
        deleteTopicComponent({
          classSubjectId: params.class_subject_id,
          ...topicComponent,
        })
      );
    }
  };

  useEffect(() => {
    setSubject(JSON.parse(localStorage.getItem("subject")));
    setEditingTopic(null);
    dispatch(
      getTopicList({
        classSubjectId: params.class_subject_id,
      })
    );
  }, []);

  return (
    <>
      <div className="pagetitle">
        <h1>{subjectSelectors.getSubjectName(subject)}</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </li>
            <li className="breadcrumb-item active">
              {subjectSelectors.getSubjectName(subject)}
            </li>
          </ol>
        </nav>
      </div>

      <ComponentCard>
        <div
          className="d-flex flew-row align-items-center justify-content-end"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            setShowAddTopicModal(true);
          }}
        >
          <IoAddCircleOutline style={{ margin: "0 10px" }} />
          <b>Add New Topic</b>
        </div>
        {topicList.map((topic) => (
          <div key={topicSelectors.getTopicId(topic)} className="pb-2">
            <div style={{ position: "relative" }}>
              <hr className="my-2" />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                className="card-title p-1"
              >
                {topicSelectors.getName(topic)}
              </p>
              <hr className="my-2 mb-4" />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BsFillPencilFill
                  color="green"
                  size={18}
                  style={{ marginRight: "12px" }}
                  onClick={() => {
                    setShowAddTopicModal(true);
                    setIsEditingTopic(true);
                    setEditingTopic(topic);
                  }}
                />
                <IoTrash
                  color="red"
                  size={18}
                  onClick={() => onDeleteTopic(topic)}
                />
              </div>
            </div>

            {topicSelectors
              .getTopicComponentList(topic)
              .map((topicComponent) => {
                return (
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "15px",
                    }}
                    key={topicComponentSelectors.getTopicComponentId(
                      topicComponent
                    )}
                  >
                    {topicComponentSelectors.getComponentType(
                      topicComponent
                    ) === 1 && (
                      <RichTextEditor
                        readOnly={true}
                        editorState={EditorState.createWithContent(
                          convertFromRaw(
                            JSON.parse(
                              topicComponentSelectors.getcontent(topicComponent)
                            )
                          )
                        )}
                      />
                    )}
                    {topicComponentSelectors.getComponentType(
                      topicComponent
                    ) === 2 && (
                      <a
                        href={`${
                          process.env.REACT_APP_BACKEND_URL
                        }/topic/download?url=${topicComponentSelectors.getUrl(
                          topicComponent
                        )}&fileName=${topicComponentSelectors.getFileName(
                          topicComponent
                        )}`}
                        className="text-primary"
                      >
                        <i
                          className="bi bi-file-text-fill me-2"
                          style={{ fontSize: "18px" }}
                        ></i>
                        {topicComponentSelectors.getFileName(topicComponent)}
                      </a>
                    )}
                    {topicComponentSelectors.getComponentType(
                      topicComponent
                    ) === 3 && (
                      <p
                        onClick={() => {
                          localStorage.setItem(
                            "forum",
                            JSON.stringify(topicComponent)
                          );
                          navigate(
                            "/dashboard/forum/" +
                              topicComponentSelectors.getForumId(topicComponent)
                          );
                        }}
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="bi bi-chat-left-text-fill me-2"
                          style={{ fontSize: "18px", color: "teal" }}
                        ></i>
                        {topicComponentSelectors.getTitle(topicComponent)}
                      </p>
                    )}
                    {topicComponentSelectors.getComponentType(
                      topicComponent
                    ) === 4 && (
                      <p
                        onClick={() => {
                          localStorage.setItem(
                            "submission",
                            JSON.stringify(topicComponent)
                          );
                          navigate(
                            "/dashboard/submission/" +
                              topicComponentSelectors.getSubmissionId(
                                topicComponent
                              )
                          );
                        }}
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <i
                          className="bi bi-inboxes-fill me-2"
                          style={{ fontSize: "18px", color: "crimson" }}
                        ></i>
                        {topicComponentSelectors.getTitle(topicComponent)}
                      </p>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                    >
                      <BsFillPencilFill
                        color="green"
                        size={18}
                        style={{ marginRight: "12px" }}
                        onClick={() => {
                          setShowTopicComponentModal(true);
                          setIsEditingTopicComponent(true);
                          setEditingTopicComponent(topicComponent);
                        }}
                      />
                      <IoTrash
                        color="red"
                        size={18}
                        onClick={() => onDeleteTopicComponent(topicComponent)}
                      />
                    </div>
                  </div>
                );
              })}
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setShowTopicComponentModal(true);
                setEditingTopic(topic);
              }}
            >
              <IoAddCircleOutline style={{ margin: "0 10px" }} />
              <b>Add Component</b>
            </div>
          </div>
        ))}
      </ComponentCard>
      <TopicModal
        showModal={showAddTopicModal}
        onCloseModal={() => {
          setShowAddTopicModal(false);
          setIsEditingTopic(false);
        }}
        onAddTopic={onAddTopic}
        isEditing={isEditingTopic}
        editingTopic={editingTopic}
      />
      <TopicComponentModal
        showModal={showTopicComponentModal}
        onCloseModal={() => {
          setIsEditingTopicComponent(false);
          setShowTopicComponentModal(false);
        }}
        onAddTopicComponent={onAddTopicComponent}
        isEditing={isEditingTopicComponent}
        editingTopicComponent={editingTopicComponent}
        onUpdateTopicComponent={onUpdateTopicComponent}
      />
    </>
  );
};

export default ViewTeacherSubject;
