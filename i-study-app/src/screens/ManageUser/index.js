import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList, updateUserProfile } from "../../thunks/user";
import * as userSelectors from "../../selectors/user";
import { USER_TYPE_NAME, USER_TYPE_NUMBER } from "../../utilities/constants";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import EditModal from "./components/EditModal";
import CommonFormGroup from "../common/CommonFormGroup";
import { IoAddCircleOutline } from "react-icons/io5";

const ManageUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const userList = userSelectors.getUserList(user);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [displayedUserList, setDisplayedUserList] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    setShowModal(false);
    let filteredUserListCopy = userList.filter((user) =>
      userType === "" ? true : userSelectors.getUserType(user) === userType
    );
    setMaxPage(0);
    setCurrentPage(0);
    setFilteredUserList(filteredUserListCopy);
    setMaxPage(Math.ceil(filteredUserListCopy.length / 10));
    setDisplayedUserList(filteredUserListCopy.slice(0, 10));
  }, [userList, userType]);

  useEffect(
    () =>
      setDisplayedUserList(
        filteredUserList.slice(currentPage * 10, currentPage * 10 + 10)
      ),
    [currentPage]
  );

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        dispatch(getUserList({ name: searchText }));
      }, 1000)
    );
  }, [searchText]);

  const onClickDelete = (name, userId) => {
    if (window.confirm(`Are you sure to delete the user named ${name}?`))
      dispatch(deleteUser({ userId }));
    // dispatch(deleteUser({ userId }));
  };

  const onClickEdit = (element) => {
    setShowModal(true);
    setEditingUser(element);
  };

  const onSubmitEdit = (user) => {
    dispatch(updateUserProfile(user));
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Manage User</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">User</li>
          </ol>
        </nav>
      </div>

      <Card className="card">
        <Card.Body className="card-body pt-4">
          <div className="d-flex justify-content-between">
            <div>
              <Form.Control
                type="text"
                placeholder="Search.."
                style={{ width: "400px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <CommonFormGroup as={Row} className="d-flex align-items-center">
              <Col>Filter:</Col>
              <Col lg="auto">
                <Form.Select
                  value={userType}
                  onChange={(e) => setUserType(parseInt(e.target.value) || "")}
                >
                  <option value="">All User</option>
                  <option value={USER_TYPE_NUMBER["TEACHER"]}>Teacher</option>
                  <option value={USER_TYPE_NUMBER["STUDENT"]}>Student</option>
                </Form.Select>
              </Col>
            </CommonFormGroup>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                navigate("./register_user");
              }}
            >
              <IoAddCircleOutline style={{ margin: "0 8px" }} />
              <b>Add New User</b>
            </div>
          </div>
          <Table className="my-2" bordered>
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Name</th>
                <th className="text-center">User Type</th>
                {/* <th>Created Date</th> */}
                <th className="text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              {displayedUserList.map((element, index) => {
                return (
                  <tr key={userSelectors.getUserId(element)} className="py-2">
                    <td>{currentPage * 10 + index + 1}</td>
                    <td>{userSelectors.getName(element)}</td>
                    <td>
                      {USER_TYPE_NAME[userSelectors.getUserType(element)]}
                    </td>
                    <td>
                      <Row className="d-flex justify-content-center">
                        <Col xs sm="auto">
                          <Button onClick={() => onClickEdit(element)}>
                            Edit
                          </Button>
                        </Col>
                        <Col xs sm="auto">
                          <Button
                            variant="danger"
                            onClick={() =>
                              onClickDelete(
                                userSelectors.getName(element),
                                userSelectors.getUserId(element)
                              )
                            }
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(maxPage).keys()].map((e) => (
              <Pagination.Item
                key={e}
                active={e === currentPage}
                onClick={() => setCurrentPage(e)}
              >
                {e + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Card.Body>
      </Card>
      <EditModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        user={editingUser}
        onSubmitEdit={onSubmitEdit}
      />
    </>
  );
};

export default ManageUser;
