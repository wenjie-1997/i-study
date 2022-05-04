import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as userSelectors from "../../selectors/user";
import * as authSelectors from "../../selectors/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../thunks/user";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { getformattedDate } from "../../utilities/helper";

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [editedTelNo, setEditedTelNo] = useState("");
  const [editedHpNo, setEditedHpNo] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const profile = userSelectors.getProfile(user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    setShowEditModal(false);
  }, [profile]);

  const userType = authSelectors.getUserType(auth);

  const name = userSelectors.getName(profile);
  const birthday = userSelectors.getBirthday(profile);
  const gender = userSelectors.getGender(profile);
  const race = userSelectors.getRace(profile);
  const religion = userSelectors.getReligion(profile);
  const address = userSelectors.getAddress(profile);
  const telNo = userSelectors.getTelNo(profile);
  const hpNo = userSelectors.getHpNo(profile);
  const email = userSelectors.getEmail(profile);
  const schoolId = userSelectors.getSchoolId(profile);
  const disability = userSelectors.getDisability(profile);
  const officeNo = userSelectors.getOfficeNo(profile);
  const workSince = userSelectors.getWorkSince(profile);
  const education = userSelectors.getEducation(profile);
  const grade = userSelectors.getGrade(profile);

  const displayEditModal = () => {
    setEditedAddress(address);
    setEditedTelNo(telNo);
    setEditedHpNo(hpNo);
    setEditedEmail(email);
    setShowEditModal(true);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        address: editedAddress,
        telNo: editedTelNo,
        hpNo: editedHpNo,
        email: editedEmail,
      })
    );
  };

  return (
    <>
      <div className="mx-auto my-4 center w-75">
        <Row>
          <Col>
            <h2 className="my-2">Profile Details</h2>
          </Col>
          <Col xs sm="auto">
            <Button variant="success" onClick={displayEditModal}>
              Edit
            </Button>
          </Col>
          <Col xs sm="auto">
            <Button
              variant="warning"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </Button>
          </Col>
        </Row>

        <Card className="py-5 px-3">
          <Container>
            <Row className="d-flex align-items-lg-center">
              {/* <Col xs={12} sm={4} className="imageContainer">
                <div className="circle"></div>
              </Col> */}

              <Col>
                <Row>
                  <Col xs={6} sm={4}>
                    Name
                  </Col>
                  <Col xs={6} sm={4}>
                    {name}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Date of Birth
                  </Col>
                  <Col xs={6} sm={4}>
                    {getformattedDate(birthday)}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Gender
                  </Col>
                  <Col xs={6} sm={4}>
                    {gender}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Race
                  </Col>
                  <Col xs={6} sm={4}>
                    {race}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Religion
                  </Col>
                  <Col xs={6} sm={4}>
                    {religion}
                  </Col>
                </Row>
                {userType === 1 && (
                  <>
                    <Row>
                      <Col xs={6} sm={4}>
                        Office No
                      </Col>
                      <Col xs={6} sm={4}>
                        {officeNo}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={4}>
                        Work Since
                      </Col>
                      <Col xs={6} sm={4}>
                        {getformattedDate(workSince)}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={4}>
                        Education
                      </Col>
                      <Col xs={6} sm={4}>
                        {education}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={4}>
                        Grade
                      </Col>
                      <Col xs={6} sm={4}>
                        {grade}
                      </Col>
                    </Row>
                  </>
                )}
                {userType === 2 && (
                  <>
                    <Row>
                      <Col xs={6} sm={4}>
                        Disability
                      </Col>
                      <Col xs={6} sm={4}>
                        {disability}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={4}>
                        School ID
                      </Col>
                      <Col xs={6} sm={4}>
                        {schoolId}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={4}>
                        Class
                      </Col>
                      <Col xs={6} sm={4}>
                        -
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col>
                <Row>
                  <Col xs={6} sm={4}>
                    Address
                  </Col>
                  <Col xs={6} sm={4}>
                    {address}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Tel No
                  </Col>
                  <Col xs={6} sm={4}>
                    {telNo}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Hp No
                  </Col>
                  <Col xs={6} sm={4}>
                    {hpNo}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4}>
                    Email
                  </Col>
                  <Col xs={6} sm={4}>
                    {email}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      <Modal size="lg" show={showEditModal}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body className="mx-3 my-2">
          <Form onSubmit={onSubmitEdit}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tel No</Form.Label>
              <Form.Control
                value={editedTelNo || ""}
                onChange={(e) => setEditedTelNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hp No</Form.Label>
              <Form.Control
                value={editedHpNo || ""}
                onChange={(e) => setEditedHpNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedEmail || ""}
                onChange={(e) => setEditedEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Row className="mt-4 d-flex justify-content-end">
              <Col xs sm="auto">
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </Button>
              </Col>
              <Col xs sm="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <ChangePasswordModal
        showModal={showChangePasswordModal}
        onCloseModal={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default Profile;
