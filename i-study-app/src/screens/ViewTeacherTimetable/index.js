import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getStudentTimetable } from "../../thunks/student";
import * as teacherSelectors from "../../selectors/teacher";
import * as timetableSlotSelectors from "../../selectors/timetableSlot";
import * as subjectSelectors from "../../selectors/subject";
import { DAYS } from "../../utilities/constants";
import { getTeacherTimetable } from "../../thunks/teacher";

const ViewTeacherTimetable = () => {
  const dispatch = useDispatch();
  const teacherModal = useSelector((state) => state.teacher);

  const timetable = teacherSelectors.getTimetable(teacherModal);

  useEffect(() => dispatch(getTeacherTimetable()), [dispatch]);

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
          <i
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              margin: "0px",
            }}
          >
            {timetableSlotSelectors.getClassName(slot)}
          </i>
          <b>{subjectSelectors.getSubjectCode(slot)}</b>
        </td>
      ) : (
        <td key={rowIndex + index}></td>
      );
    });

  const daysToRows = (timetable) =>
    timetable.map((days, index) => ({ day: DAYS[index], slots: days }));

  return (
    <>
      <div class="pagetitle">
        <h1>Timetable</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Timetable</li>
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

export default ViewTeacherTimetable;
