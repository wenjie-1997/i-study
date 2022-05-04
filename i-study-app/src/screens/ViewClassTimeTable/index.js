import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClassTimetable } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import Button from "react-bootstrap/Button";
import { DAYS } from "../../utilities/constants";

const ViewClassTimetable = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const classModal = useSelector((state) => state.class);

  const timetableSlots = classSelectors.getTimetableSlots(classModal);

  useEffect(
    () => dispatch(getClassTimetable({ classId: params.class_id })),
    [dispatch, params.class_id]
  );

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
    <div className="mx-auto my-4 w-75">
      <div className="d-flex flex-row justify-content-between">
        <h3>View Class Timetable</h3>
        <Button
          onClick={() =>
            navigate("../view_class/edit_timetable/" + params.class_id)
          }
        >
          Edit Timetable
        </Button>
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
          {timetableSlots.length !== 0 &&
            daysToRows(timetableSlots).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td height="100px">{row.day}</td>
                {slotToTd(timetableSlots[rowIndex], rowIndex)}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewClassTimetable;
