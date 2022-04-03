import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { USER_TYPE_NUMBER } from "../../utilities/constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../thunks/user";

const RegisterUser = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const isDisabled = () => {
    return (
      username === "" ||
      password === "" ||
      userType === 0 ||
      gender === "" ||
      race === "" ||
      religion === ""
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        username,
        password,
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
        schoolId,
        disability,
        workSince,
        officeNo,
        education,
        grade,
      })
    );
  };
  return (
    <div className="mx-auto my-4 w-75">
      <h3>Register User</h3>
      <Card className="py-5 px-5 justify-content-flex-start">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Race</Form.Label>
            <Form.Check
              type="radio"
              label="Malay"
              name="race"
              value="Malay"
              onChange={(e) => setRace(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Chinese"
              name="race"
              value="Chinese"
              onChange={(e) => setRace(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Indian"
              name="race"
              value="Indian"
              onChange={(e) => setRace(e.target.value)}
            />
            <Row className="d-flex align-items-center">
              <Col xs sm="auto">
                <Form.Check
                  type="radio"
                  label="Other"
                  name="race"
                  value="Other"
                  onChange={(e) => setRace(e.target.value)}
                />
              </Col>
              {!["Malay", "Chinese", "Indian"].includes(race) && (
                <Col xs sm="auto">
                  <Form.Control
                    type="input"
                    onChange={(e) => setRace(e.target.value)}
                  />
                </Col>
              )}
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>Religion</Form.Label>
            <Form.Check
              type="radio"
              label="Islam"
              name="religion"
              value="Islam"
              onChange={(e) => setReligion(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Christianity"
              name="religion"
              value="Christianity"
              onChange={(e) => setReligion(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Hinduism"
              name="religion"
              value="Hinduism"
              onChange={(e) => setReligion(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Buddism"
              name="religion"
              value="Buddhism"
              onChange={(e) => setReligion(e.target.value)}
            />

            <Row className="d-flex align-items-center">
              <Col xs sm="auto">
                <Form.Check
                  type="radio"
                  label="Other"
                  name="religion"
                  value=""
                  onChange={(e) => setReligion(e.target.value)}
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              maxLength={300}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telephone No.</Form.Label>
            <Form.Control
              value={telNo}
              onChange={(e) => setTelNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Home Phone No.</Form.Label>
            <Form.Control
              value={hpNo}
              onChange={(e) => setHpNO(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Type</Form.Label>
            <Form.Select
              value={userType}
              onChange={(e) => setUserType(parseInt(e.target.value))}
            >
              <option value={0}>-- Please Select--</option>
              <option value={USER_TYPE_NUMBER.STUDENT}>Student</option>
              <option value={USER_TYPE_NUMBER.TEACHER}>Teacher</option>
            </Form.Select>
          </Form.Group>
          {userType === 1 && (
            <Fragment>
              <Form.Group>
                <Form.Label>Work Since</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setWorkSince(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Office Desk No.</Form.Label>
                <Form.Control
                  value={officeNo}
                  onChange={(e) => setOfficeNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Education</Form.Label>
                <Form.Control
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </Form.Group>
            </Fragment>
          )}
          {userType === 2 && (
            <>
              <Form.Group>
                <Form.Label>School Id</Form.Label>
                <Form.Control
                  type="text"
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Disability</Form.Label>
                <Form.Control
                  type="text"
                  value={disability}
                  onChange={(e) => setDisability(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          <br />
          <Button disabled={isDisabled()} type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterUser;
