import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as userSelectors from "../../selectors/user";
import * as authSelectors from "../../selectors/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../thunks/user";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { getformattedDate } from "../../utilities/helper";
import CommonFormGroup from "../common/CommonFormGroup";

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
  const className = userSelectors.getClassName(profile);

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
      <div className="pagetitle">
        <h1>Profile Details</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>

      <Card className="card profile">
        <Card.Body className="pt-3">
          <div className="d-flex flex-row align-items-end">
            <h5 className="card-title py-1">General Details</h5>
            <div className="flex-grow-1" />
            <Button
              variant="success"
              className="py-1 m-0"
              onClick={displayEditModal}
            >
              Edit
            </Button>
            <Button
              variant="warning"
              className="py-1 m-0 ms-3"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </Button>
          </div>
          <div className="profile-overview">
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Name</div>
              <div className="col-lg-9 col-md-8">{name}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Date of Birth</div>
              <div className="col-lg-9 col-md-8">
                {getformattedDate(birthday)}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Gender</div>
              <div className="col-lg-9 col-md-8">{gender}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Race</div>
              <div className="col-lg-9 col-md-8">{race}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Religion</div>
              <div className="col-lg-9 col-md-8">{religion}</div>
            </div>
            {userType === 1 && (
              <>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Office No</div>
                  <div className="col-lg-9 col-md-8">{officeNo}</div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Work Since</div>
                  <div className="col-lg-9 col-md-8">
                    {getformattedDate(workSince)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Education</div>
                  <div className="col-lg-9 col-md-8">{education}</div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Grade</div>
                  <div className="col-lg-9 col-md-8">{grade}</div>
                </div>
              </>
            )}
            {userType === 2 && (
              <>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Disability</div>
                  <div className="col-lg-9 col-md-8">{disability}</div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">School ID</div>
                  <div className="col-lg-9 col-md-8">{schoolId}</div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Class</div>
                  <div className="col-lg-9 col-md-8">{className}</div>
                </div>
              </>
            )}
            <h1 className="card-title">Contact Details</h1>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Address</div>
              <div className="col-lg-9 col-md-8">{address}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Tel No</div>
              <div className="col-lg-9 col-md-8">{telNo}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Hp No</div>
              <div className="col-lg-9 col-md-8">{hpNo}</div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Email</div>
              <div className="col-lg-9 col-md-8">{email}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal size="lg" show={showEditModal}>
        <Form onSubmit={onSubmitEdit}>
          <Modal.Header className="modal-header">Edit Profile</Modal.Header>
          <Modal.Body className="mx-3 my-2">
            <CommonFormGroup>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                required
              />
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Tel No</Form.Label>
              <Form.Control
                value={editedTelNo || ""}
                onChange={(e) => setEditedTelNo(e.target.value)}
              />
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Hp No</Form.Label>
              <Form.Control
                value={editedHpNo || ""}
                onChange={(e) => setEditedHpNo(e.target.value)}
              />
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedEmail || ""}
                onChange={(e) => setEditedEmail(e.target.value)}
                required
              />
            </CommonFormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ChangePasswordModal
        showModal={showChangePasswordModal}
        onCloseModal={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default Profile;
