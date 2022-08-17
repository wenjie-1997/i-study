import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopicList } from "../../thunks/topic";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as subjectSelectors from "../../selectors/subject";
import * as topicSelectors from "../../selectors/topic";
import { useNavigate, useParams } from "react-router-dom";
import ComponentCard from "../common/ComponentCard";
import RichTextEditor from "../common/RichTextEditor";
import { convertFromRaw, EditorState } from "draft-js";

const ViewStudentSubject = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);

  const topicModal = useSelector((state) => state.topic);
  const topicList = topicSelectors.getTopicList(topicModal);

  useEffect(() => {
    setSubject(JSON.parse(localStorage.getItem("subject")));
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
        {topicList.map((topic) => (
          <div key={topicSelectors.getTopicId(topic)} className="pb-2">
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
            {topicSelectors
              .getTopicComponentList(topic)
              .map((topicComponent) => (
                <div
                  style={{
                    position: "relative",
                    marginBottom: "15px",
                  }}
                  key={topicComponentSelectors.getTopicComponentId(
                    topicComponent
                  )}
                >
                  {topicComponentSelectors.getComponentType(topicComponent) ===
                    1 && (
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
                  {topicComponentSelectors.getComponentType(topicComponent) ===
                    2 && (
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
                  {topicComponentSelectors.getComponentType(topicComponent) ===
                    3 && (
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
                  {topicComponentSelectors.getComponentType(topicComponent) ===
                    4 && (
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
                      <i
                        className="bi bi-inboxes-fill me-2"
                        style={{ fontSize: "18px", color: "crimson" }}
                      ></i>
                      {topicComponentSelectors.getTitle(topicComponent)}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ))}
      </ComponentCard>
    </>
  );
};

export default ViewStudentSubject;
