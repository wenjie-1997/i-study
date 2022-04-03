import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as userSelectors from "../../selectors/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../thunks/user";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [editedTelNo, setEditedTelNo] = useState("");
  const [editedHpNo, setEditedHpNo] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = userSelectors.getProfile(user);
  const auth = userSelectors.getUser(user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    setShowModal(false);
  }, [profile]);

  const userType = userSelectors.getUserType(auth);

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
    setShowModal(true);
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
        </Row>

        <Card className="py-5 px-3">
          <Container>
            <Row className="d-flex align-items-lg-center">
              {/* <Col xs={12} lg={5} className="imageContainer">
                <div className="circle"></div>
              </Col> */}

              <Col xs={12} lg={7}>
                <Row>
                  <Col xs={6} lg={5}>
                    Name
                  </Col>
                  <Col xs={6} lg={7}>
                    {name}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={5}>
                    Date of Birth
                  </Col>
                  <Col xs={6} lg={7}>
                    {birthday}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={5}>
                    Gender
                  </Col>
                  <Col xs={6} lg={7}>
                    {gender}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={5}>
                    Race
                  </Col>
                  <Col xs={6} lg={7}>
                    {race}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={5}>
                    Religion
                  </Col>
                  <Col xs={6} lg={7}>
                    {religion}
                  </Col>
                </Row>
                {userType === 1 && (
                  <>
                    <Row>
                      <Col xs={6} lg={5}>
                        Office No
                      </Col>
                      <Col xs={6} lg={7}>
                        {officeNo}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} lg={5}>
                        Work Since
                      </Col>
                      <Col xs={6} lg={7}>
                        {workSince}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} lg={5}>
                        Education
                      </Col>
                      <Col xs={6} lg={7}>
                        {education}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} lg={5}>
                        Grade
                      </Col>
                      <Col xs={6} lg={7}>
                        {grade}
                      </Col>
                    </Row>
                  </>
                )}
                {userType === 2 && (
                  <>
                    <Row>
                      <Col xs={6} lg={5}>
                        Disability
                      </Col>
                      <Col xs={6} lg={7}>
                        {disability}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} lg={5}>
                        School ID
                      </Col>
                      <Col xs={6} lg={7}>
                        {schoolId}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} lg={5}>
                        Class
                      </Col>
                      <Col xs={6} lg={7}>
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
                  <Col xs={6} lg={4}>
                    Address
                  </Col>
                  <Col xs={6} lg={4}>
                    {address}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={4}>
                    Tel No
                  </Col>
                  <Col xs={6} lg={4}>
                    {telNo}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={4}>
                    Hp No
                  </Col>
                  <Col xs={6} lg={4}>
                    {hpNo}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={4}>
                    Email
                  </Col>
                  <Col xs={6} lg={4}>
                    {email}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      <Modal size="lg" show={showModal}>
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
                <Button variant="secondary" onClick={() => setShowModal(false)}>
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
    </>
  );
};

export default Profile;
