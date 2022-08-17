import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getStudentTimetable } from "../../thunks/student";
import * as studentSelectors from "../../selectors/student";
import * as timetableSlotSelectors from "../../selectors/timetableSlot";
import * as subjectSelectors from "../../selectors/subject";
import { DAYS } from "../../utilities/constants";
// import { useNavigate, useParams } from "react-router-dom";
// import { getClassTimetable } from "../../thunks/class";
// import * as classSelectors from "../../selectors/class";
// import Button from "react-bootstrap/Button";
// import { DAYS } from "../../utilities/constants";

const ViewStudentTimetable = () => {
  const dispatch = useDispatch();
  const studentModal = useSelector((state) => state.student);

  const timetable = studentSelectors.getTimetable(studentModal);
  const [className, setClassName] = useState("");

  useEffect(() => {
    dispatch(getStudentTimetable());
    setClassName(localStorage.getItem("className"));
  }, [dispatch]);

  let displayedTimetable = Array(5).fill([]);
  displayedTimetable = displayedTimetable.map((slots, index) => {
    let array = [];
    for (let i = 0; i < 12; i++) {
      let subjectIndex = timetable.findIndex(
        (e) =>
          timetableSlotSelectors.getDay(e) - 1 === index &&
          timetableSlotSelectors.getStartingSlot(e) - 1 === i
      );
      if (subjectIndex !== -1) {
        const subject = timetable[subjectIndex];
        array.push(subject);
        i += timetableSlotSelectors.getNoOfSlots(subject) - 1;
      } else {
        array.push({});
      }
    }
    return array;
  });

  const slotToTd = (timetableRow, rowIndex) =>
    timetableRow.map((slot, index) => {
      return subjectSelectors.getSubjectId(slot) !== 0 ? (
        <td
          key={rowIndex + index}
          colSpan={timetableSlotSelectors.getNoOfSlots(slot)}
          className="text-center align-middle"
          style={{ position: "relative" }}
        >
          <b>{subjectSelectors.getSubjectCode(slot)}</b>
          <i
            style={{
              position: "absolute",
              right: 0,
              bottom: 5,
              margin: "0px",
              textAlign: "right",
              lineHeight: 0.8,
              fontSize: 14,
            }}
          >
            {subjectSelectors.getTeacherName(slot)}
          </i>
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
        <h1>Timetable{className !== null && ` for Class ${className}`}</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Timetable</li>
          </ol>
        </nav>
      </div>

      <div className="card px-2 py-1">
        <Table bordered>
          <tbody>
            <tr>
              <td></td>
              <td width="7.7%" className="text-center">
                1
              </td>
              <td width="7.7%" className="text-center">
                2
              </td>
              <td width="7.7%" className="text-center">
                3
              </td>
              <td width="7.7%" className="text-center">
                4
              </td>
              <td width="7.7%" className="text-center">
                5
              </td>
              <td width="7.7%" className="text-center">
                6
              </td>
              <td width="7.7%" className="text-center">
                7
              </td>
              <td width="7.7%" className="text-center">
                8
              </td>
              <td width="7.7%" className="text-center">
                9
              </td>
              <td width="7.7%" className="text-center">
                10
              </td>
              <td width="7.7%" className="text-center">
                11
              </td>
              <td width="7.7%" className="text-center">
                12
              </td>
            </tr>
            {displayedTimetable.length !== 0 &&
              daysToRows(displayedTimetable).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    height="100px"
                    className="d-flex align-items-center justify-content-center"
                  >
                    {row.day}
                  </td>
                  {slotToTd(displayedTimetable[rowIndex], rowIndex)}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ViewStudentTimetable;
