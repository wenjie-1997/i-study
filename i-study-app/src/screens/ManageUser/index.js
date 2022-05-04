import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList, updateUserProfile } from "../../thunks/user";
import * as userSelectors from "../../selectors/user";
import { USER_TYPE_NAME, USER_TYPE_NUMBER } from "../../utilities/constants";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import EditModal from "./components/EditModal";

const ManageUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [displayedUserList, setDisplayedUserList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userList = userSelectors.getUserList(user);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    setShowModal(false);
    setDisplayedUserList(
      userList.filter((user) =>
        userType === "" ? true : userSelectors.getUserType(user) === userType
      )
    );
  }, [userList, userType]);

  const onClickDelete = (userId) => {
    dispatch(deleteUser({ userId }));
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
      <div className="mx-auto my-4 w-75">
        <Row>
          <Col>
            <h3 className="my-2">Manage User</h3>
          </Col>
          <Col />
          <Col xs sm="auto">
            <Button variant="primary" as={Link} to="../register_user">
              Register User
            </Button>
          </Col>
        </Row>

        <Card className="py-5 px-5 justify-content-flex-start">
          <Row>
            <Col lg="auto">
              <Form.Control type="text" placeholder="Search.." />
            </Col>
            <Col />
            <Col lg="auto">
              <Form.Group as={Row} className="d-flex align-items-center">
                <Col>Filter:</Col>
                <Col lg="auto">
                  <Form.Select
                    value={userType}
                    onChange={(e) =>
                      setUserType(parseInt(e.target.value) || "")
                    }
                  >
                    <option value="">All User</option>
                    <option value={USER_TYPE_NUMBER["TEACHER"]}>Teacher</option>
                    <option value={USER_TYPE_NUMBER["STUDENT"]}>Student</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Table className="my-4" bordered>
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Name</th>
                <th className="text-center">User Type</th>
                {/* <th>Created Date</th> */}
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {displayedUserList.map((element, index) => {
                return (
                  <tr key={userSelectors.getUserId(element)}>
                    <td>{index + 1}</td>
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
                              onClickDelete(userSelectors.getUserId(element))
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
        </Card>
      </div>
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
