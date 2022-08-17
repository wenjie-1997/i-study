import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClassTimetable } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import Card from "react-bootstrap/Card";
import { DAYS } from "../../utilities/constants";
import FailedResponseModal from "./components/FailedResponseModal";
import { BsFillPencilFill } from "react-icons/bs";
import { CLOSE_FAILED_RESPONSE_MODAL } from "../../reducers/class";

const ViewClassTimetable = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const classModal = useSelector((state) => state.class);
  const [showFailedRequestModal, setShowFailedRequestModal] = useState(false);
  const [className, setClassName] = useState("");

  const timetableSlots = classSelectors.getTimetableSlots(classModal);

  const failedResponse = classSelectors.getFailedResponse(classModal);

  useEffect(() => {
    const classObj = JSON.parse(localStorage.getItem("class"));
    setClassName(classSelectors.getName(classObj));
    dispatch(getClassTimetable({ classId: params.class_id }));
  }, [dispatch, params.class_id]);

  useEffect(() => {
    if (failedResponse && !showFailedRequestModal)
      setShowFailedRequestModal(true);
  }, [failedResponse]);

  const slotToTd = (timetableRow, rowIndex) =>
    timetableRow.map((slot, index) => {
      return slot?.subject_id ? (
        <td
          key={rowIndex + index}
          colSpan={slot.no_of_slots}
          className="text-center align-middle "
        >
          <b>{slot.code}</b>
        </td>
      ) : (
        <td key={rowIndex + index}></td>
      );
    });

  const daysToRows = (timetable) =>
    timetable.map((days, index) => ({ day: DAYS[index], slots: days }));

  return (
    <>
      <div className="pagetitle">
        <h1>View Class Timetable</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/manage_class")}
            >
              Class
            </li>
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/dashboard/view_class/" + params.class_id)
              }
            >
              {className}
            </li>
            <li className="breadcrumb-item active">Class Timetable</li>
          </ol>
        </nav>
      </div>
      <Card>
        <Card.Body className="pt-4">
          <div className="d-flex flex-row justify-content-end">
            <b
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() =>
                navigate("../view_class/edit_timetable/" + params.class_id)
              }
            >
              <BsFillPencilFill style={{ margin: "0 8px" }} />
              Edit Timetable
            </b>
          </div>
          <Table bordered className="my-2">
            <tbody>
              <tr>
                <td></td>
                <td width="7.7%">1</td>
                <td width="7.7%">2</td>
                <td width="7.7%">3</td>
                <td width="7.7%">4</td>
                <td width="7.7%">5</td>
                <td width="7.7%">6</td>
                <td width="7.7%">7</td>
                <td width="7.7%">8</td>
                <td width="7.7%">9</td>
                <td width="7.7%">10</td>
                <td width="7.7%">11</td>
                <td width="7.7%">12</td>
              </tr>
              {timetableSlots.length !== 0 &&
                daysToRows(timetableSlots).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td height="100px">{row.day}</td>
                    {slotToTd(timetableSlots[rowIndex], rowIndex)}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <FailedResponseModal
        showModal={showFailedRequestModal}
        onCloseModal={() => {
          setShowFailedRequestModal(false);
          dispatch(CLOSE_FAILED_RESPONSE_MODAL());
        }}
      />
    </>
  );
};

export default ViewClassTimetable;
