import React, { useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { USER_TYPE_NUMBER } from "../../../utilities/constants";
import * as userSelectors from "../../../selectors/user";
import CommonFormGroup from "../../common/CommonFormGroup";

const EditModal = ({ showModal, onCloseModal, onSubmitEdit, user }) => {
  useEffect(() => {
    setUsername(userSelectors.getUsername(user));
    setName(userSelectors.getName(user));
    setUserType(userSelectors.getUserType(user));
    setBirthday(userSelectors.getBirthday(user));
    setGender(userSelectors.getGender(user));
    setRace(userSelectors.getRace(user));
    setReligion(userSelectors.getReligion(user));
    setAddress(userSelectors.getAddress(user));
    setTelNo(userSelectors.getTelNo(user));
    setHpNO(userSelectors.getHpNo(user));
    setEmail(userSelectors.getEmail(user));
    setSchoolId(userSelectors.getSchoolId(user));
    setDisability(userSelectors.getDisability(user));
    setWorkSince(userSelectors.getWorkSince(user));
    setOfficeNo(userSelectors.getOfficeNo(user));
    setEducation(userSelectors.getEducation(user));
    setGrade(userSelectors.getGrade(user));
  }, [user]);

  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(0);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [religion, setReligion] = useState("");
  const [address, setAddress] = useState("");
  const [telNo, setTelNo] = useState("");
  const [hpNo, setHpNO] = useState("");
  const [email, setEmail] = useState("");

  const [schoolId, setSchoolId] = useState("");
  const [disability, setDisability] = useState("");

  const [workSince, setWorkSince] = useState(null);
  const [officeNo, setOfficeNo] = useState("");
  const [education, setEducation] = useState("");
  const [grade, setGrade] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitEdit({
      userId: userSelectors.getUserId(user),
      username,
      userType,
      name,
      birthday,
      gender,
      race,
      religion,
      address,
      telNo,
      hpNo,
      email,
      ...(userType === USER_TYPE_NUMBER.TEACHER && {
        teacherId: userSelectors.getTeacherId(user),
        workSince,
        officeNo,
        education,
        grade,
      }),
      ...(userType === USER_TYPE_NUMBER.STUDENT && {
        studentId: userSelectors.getStudentId(user),
        schoolId,
        disability,
      }),
    });
  };

  return (
    <Modal size="lg" show={showModal} onHide={onCloseModal}>
      <Form onSubmit={onSubmit}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body className="mx-3 my-2">
          <CommonFormGroup>
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} disabled />
          </CommonFormGroup>

          <CommonFormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
              value={new Date(birthday).toISOString().substring(0, 10)}
              required
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Male"}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Female"}
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Race</Form.Label>
            <Form.Check
              type="radio"
              label="Malay"
              name="race"
              value="Malay"
              onChange={(e) => setRace(e.target.value)}
              checked={race === "Malay"}
            />
            <Form.Check
              type="radio"
              label="Chinese"
              name="race"
              value="Chinese"
              onChange={(e) => setRace(e.target.value)}
              checked={race === "Chinese"}
            />
            <Form.Check
              type="radio"
              label="Indian"
              name="race"
              value="Indian"
              onChange={(e) => setRace(e.target.value)}
              checked={race === "Indian"}
            />
            <Row className="d-flex align-items-center">
              <Col xs sm="auto">
                <Form.Check
                  type="radio"
                  label="Other"
                  name="race"
                  value="Other"
                  onChange={(e) => setRace(e.target.value)}
                  checked={
                    race !== "" &&
                    !["Malay", "Chinese", "Indian"].includes(race)
                  }
                />
              </Col>
              {!["Malay", "Chinese", "Indian"].includes(race) && (
                <Col xs sm="auto">
                  <Form.Control
                    value={race}
                    type="input"
                    onChange={(e) => setRace(e.target.value)}
                  />
                </Col>
              )}
            </Row>
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Religion</Form.Label>
            <Form.Check
              type="radio"
              label="Islam"
              name="religion"
              value="Islam"
              onChange={(e) => setReligion(e.target.value)}
              checked={religion === "Islam"}
            />
            <Form.Check
              type="radio"
              label="Christianity"
              name="religion"
              value="Christianity"
              onChange={(e) => setReligion(e.target.value)}
              checked={religion === "Christianity"}
            />
            <Form.Check
              type="radio"
              label="Hinduism"
              name="religion"
              value="Hinduism"
              onChange={(e) => setReligion(e.target.value)}
              checked={religion === "Hinduism"}
            />
            <Form.Check
              type="radio"
              label="Buddism"
              name="religion"
              value="Buddhism"
              onChange={(e) => setReligion(e.target.value)}
              checked={religion === "Buddhism"}
            />

            <Row className="d-flex align-items-center">
              <Col xs sm="auto">
                <Form.Check
                  type="radio"
                  label="Other"
                  name="religion"
                  value=""
                  onChange={(e) => setReligion(e.target.value)}
                  checked={
                    religion !== "" &&
                    !["Islam", "Christianity", "Hinduism", "Buddhism"].includes(
                      religion
                    )
                  }
                />
              </Col>
              {!["Islam", "Christianity", "Hinduism", "Buddhism"].includes(
                religion
              ) && (
                <Col xs sm="auto">
                  <Form.Control
                    type="input"
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                  />
                </Col>
              )}
            </Row>
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              maxLength={300}
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Telephone No.</Form.Label>
            <Form.Control
              value={telNo}
              onChange={(e) => setTelNo(e.target.value)}
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Home Phone No.</Form.Label>
            <Form.Control
              value={hpNo}
              onChange={(e) => setHpNO(e.target.value)}
            />
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </CommonFormGroup>

          {userType === 1 && (
            <Fragment>
              <CommonFormGroup>
                <Form.Label>Work Since</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setWorkSince(e.target.value)}
                  value={new Date(workSince).toISOString().substring(0, 10)}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup>
                <Form.Label>Office Desk No.</Form.Label>
                <Form.Control
                  value={officeNo}
                  onChange={(e) => setOfficeNo(e.target.value)}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup>
                <Form.Label>Education</Form.Label>
                <Form.Control
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup>
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </CommonFormGroup>
            </Fragment>
          )}
          {userType === 2 && (
            <>
              <CommonFormGroup>
                <Form.Label>School Id</Form.Label>
                <Form.Control
                  type="text"
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup>
                <Form.Label>Disability</Form.Label>
                <Form.Control
                  type="text"
                  value={disability || ""}
                  onChange={(e) => setDisability(e.target.value)}
                />
              </CommonFormGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Col xs sm="auto">
            <Button onClick={onCloseModal} variant="secondary">
              Close
            </Button>
          </Col>
          <Col xs sm="auto">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
