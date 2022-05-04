import React, { useEffect } from "react";
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

  useEffect(() => dispatch(getStudentTimetable()), [dispatch]);

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
          className="text-center align-middle "
        >
          <b>{subjectSelectors.getSubjectCode(slot)}</b>
        </td>
      ) : (
        <td key={rowIndex + index}></td>
      );
    });

  const daysToRows = (timetable) =>
    timetable.map((days, index) => ({ day: DAYS[index], slots: days }));

  return (
    <div className="mx-auto my-4 w-75">
      <div className="d-flex flex-row justify-content-between">
        <h3>View Class Timetable</h3>
      </div>
      <Table bordered>
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
          {displayedTimetable.length !== 0 &&
            daysToRows(displayedTimetable).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td height="100px">{row.day}</td>
                {slotToTd(displayedTimetable[rowIndex], rowIndex)}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewStudentTimetable;
