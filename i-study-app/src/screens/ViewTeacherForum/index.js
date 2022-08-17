import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFormGroup from "../common/CommonFormGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as forumSelectors from "../../selectors/forum";
import * as subjectSelectors from "../../selectors/subject";
import * as userSelectors from "../../selectors/user";
import {
  addForumComment,
  deleteForumComment,
  getForumCommentList,
  updateForumComment,
} from "../../thunks/forum";
import {
  getCurrentLocalISOFullString,
  getformattedDateTime,
} from "../../utilities/helper";
import { IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

const ViewTeacherForum = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState(null);
  const [forumId, setForumId] = useState(0);
  const forumModal = useSelector((state) => state.forum);
  const [comment, setComment] = useState("");
  const [editingForumCommentId, setEditingForumCommentId] = useState(0);

  useEffect(() => {
    const forumObj = JSON.parse(localStorage.getItem("forum"));
    setSubject(JSON.parse(localStorage.getItem("subject")));
    setTitle(topicComponentSelectors.getTitle(forumObj));
    setDescription(topicComponentSelectors.getDescription(forumObj));
    setForumId(topicComponentSelectors.getForumId(forumObj));
    dispatch(
      getForumCommentList({
        forumId: topicComponentSelectors.getForumId(forumObj),
      })
    );
  }, []);

  useEffect(() => {
    setEditingForumCommentId(0);
    setComment("");
  }, [forumModal]);

  const forumCommentList = forumSelectors.getForumCommentList(forumModal);

  const onSubmit = (e) => {
    e.preventDefault();
    if (editingForumCommentId) {
      dispatch(
        updateForumComment({
          comment,
          forumId,
          forumCommentId: editingForumCommentId,
        })
      );
    } else {
      dispatch(
        addForumComment({
          comment,
          forumId,
          userId: localStorage.getItem("userId"),
          addedDateTime: getCurrentLocalISOFullString(),
        })
      );
    }
  };

  const onDeleteForumComment = (forumComment) => {
    if (window.confirm("Are you sure to delete a comment?")) {
      dispatch(
        deleteForumComment({
          forumId,
          forumCommentId: forumSelectors.getForumCommentId(forumComment),
        })
      );
    }
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Forum Page</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </li>
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  "/dashboard/subject/" +
                    subjectSelectors.getClassSubjectId(subject)
                )
              }
            >
              {subjectSelectors.getSubjectName(subject)}
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </nav>
      </div>
      <Card className="card card-body">
        <p className="card-title">{title}</p>

        <p>{description}</p>
        <div>
          <h5 className="card-title">Comments</h5>
          {forumCommentList.map((forumComment) =>
            editingForumCommentId !==
            forumSelectors.getForumCommentId(forumComment) ? (
              <Card
                className="card m-0 mb-2"
                key={forumSelectors.getForumCommentId(forumComment)}
                style={{
                  position: "relative",
                  padding: "10px 20px 25px 20px",
                  boxShadow: "none",
                  border: "0.5px solid lightgrey",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <b>{userSelectors.getName(forumComment)}</b>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {userSelectors.getUserId(forumComment) ==
                      localStorage.getItem("userId") && (
                      <BsFillPencilFill
                        color="green"
                        size={18}
                        style={{ marginRight: "12px" }}
                        onClick={() => {
                          setEditingForumCommentId(
                            forumSelectors.getForumCommentId(forumComment)
                          );
                          setComment(forumSelectors.getComment(forumComment));
                        }}
                      />
                    )}
                    <IoTrash
                      color="red"
                      size={18}
                      onClick={() => onDeleteForumComment(forumComment)}
                    />
                  </div>
                </div>
                {forumSelectors.getComment(forumComment)}
                <div style={{ position: "absolute", bottom: 5, right: 10 }}>
                  <i style={{ color: "gray", fontSize: "14px" }}>
                    {getformattedDateTime(
                      forumSelectors.getAddedDateTime(forumComment)
                    )}
                  </i>
                </div>
              </Card>
            ) : (
              <Form onSubmit={onSubmit} style={{ margin: "20px 0px" }}>
                <CommonFormGroup>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Insert your comment here..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    required
                  />
                </CommonFormGroup>
                <Button type="submit">Submit</Button>
                <Button
                  onClick={() => setEditingForumCommentId(0)}
                  variant="light"
                >
                  Cancel
                </Button>
              </Form>
            )
          )}
        </div>
        {editingForumCommentId === 0 && (
          <Form onSubmit={onSubmit}>
            <CommonFormGroup>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Insert your comment here..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                required
              />
            </CommonFormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Card>
    </>
  );
};

export default ViewTeacherForum;
