import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import * as classSelectors from "../../selectors/class";
import { getClassSubjectList } from "../../thunks/class";
import { DAYS } from "../../utilities/constants";
import { updateClassTimetable } from "../../thunks/class";

const EditClassTimetable = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [collapseIsOpen, setCollapseIsOpen] = useState(Array(5).fill(false));
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [unavailableTimeslots, setUnavailableTimeslots] = useState(
    Array(5).fill([])
  );
  const [editingTimetableSlots, setEditingTimetableSlots] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [selectedStartingSlot, setSelectedStartingSlot] = useState("");
  const [selectedNoOfSlot, setSelectedNoOfSlot] = useState("");

  const classModal = useSelector((state) => state.class);
  const timetableSlots = classSelectors.getTimetableSlots(classModal);
  const subjectList = classSelectors.getClassSubjectList(classModal);
  const dayRows = [...Array(5).keys()];

  const calculateUnavailableTimeSlot = (rowSlots) =>
    rowSlots.reduce((previousValue, currentElement) => {
      for (let i = 0; i < currentElement.no_of_slots; i++) {
        previousValue.push(currentElement.starting_slot + i);
      }
      return previousValue;
    }, []);

  useEffect(() => {
    setEditingTimetableSlots(
      timetableSlots.map((rowSlots) =>
        rowSlots.filter((slot) => slot?.timetable_slot_id)
      )
    );
  }, [timetableSlots]);

  useEffect(() => {
    editingTimetableSlots.forEach((rowSlot, rowIndex) => {
      let unavailableTimeSlotsCopy = unavailableTimeslots;
      unavailableTimeSlotsCopy[rowIndex] =
        calculateUnavailableTimeSlot(rowSlot);
      setUnavailableTimeslots(unavailableTimeSlotsCopy);
    });
    setIsAddingSubject(false);
    setSelectedSubjectId("");
    setSelectedStartingSlot("");
    setSelectedNoOfSlot("");
  }, [editingTimetableSlots]);

  useEffect(
    () => dispatch(getClassSubjectList({ classId: params.class_id })),
    [dispatch]
  );

  useEffect(() => {
    if (isAddingSubject) {
      setIsAddingSubject(false);
      setSelectedSubjectId("");
      setSelectedStartingSlot("");
      setSelectedNoOfSlot("");
    }
  }, [collapseIsOpen]);

  const onClickCollapse = (rowIndex) => {
    let collapseIsOpenCopy = [...collapseIsOpen];
    collapseIsOpenCopy = collapseIsOpenCopy.map((isOpen, index) =>
      index === rowIndex ? !isOpen : false
    );
    setCollapseIsOpen(collapseIsOpenCopy);
  };

  const isAddButtonDisabled = () =>
    !selectedSubjectId || !selectedStartingSlot || !selectedNoOfSlot;

  const addSubjectToTimetable = (rowIndex) => {
    let editingTimetableSlotsCopy = [...editingTimetableSlots];
    editingTimetableSlotsCopy[rowIndex].push({
      class_subject_id: selectedSubjectId,
      name: selectedSubjectName,
      starting_slot: selectedStartingSlot,
      no_of_slots: selectedNoOfSlot,
      day: rowIndex + 1,
    });
    setEditingTimetableSlots(editingTimetableSlotsCopy);
    setIsAddingSubject(false);
  };

  const deleteSubjectFromTimetable = (rowIndex, index) => {
    let editingTimetableSlotsCopy = [...editingTimetableSlots];
    editingTimetableSlotsCopy[rowIndex].splice(index, 1);
    setEditingTimetableSlots(editingTimetableSlotsCopy);
  };

  const onUpdateTimetable = () => {
    dispatch(
      updateClassTimetable({
        classId: params.class_id,
        timetableSlots: [].concat.apply([], editingTimetableSlots),
      })
    );
  };

  return (
    <div className="mx-auto my-4 w-75">
      <div className="d-flex flex-row">
        <h3>Edit Class Timetable</h3>
        <div className="flex-grow-1" />
        <Button onClick={() => onUpdateTimetable()}>Update</Button>
      </div>
      <Card className="my-2 py-4 px-5 d-flex justtify-content-center">
        {dayRows.map((rowIndex) => (
          <Fragment key={rowIndex}>
            <div onClick={() => onClickCollapse(rowIndex)}>
              <h4 style={{ margin: 0, padding: 0 }}>{DAYS[rowIndex]}</h4>
            </div>
            <hr />
            <Collapse in={collapseIsOpen[rowIndex]}>
              <div>
                <Table>
                  <tbody>
                    {editingTimetableSlots?.length !== 0 &&
                      editingTimetableSlots[rowIndex].map((subject, index) => (
                        <tr
                          key={`${rowIndex}${index}`}
                          className={{ verticalAlign: "center" }}
                        >
                          <td width="40%" className="align-middle">
                            {subject.name}
                          </td>
                          <td width="20%" className="align-middle">
                            {subject.starting_slot}
                          </td>
                          <td width="20%" className="align-middle">
                            {subject.no_of_slots}
                          </td>
                          <td width="20%">
                            <Button
                              onClick={() =>
                                deleteSubjectFromTimetable(rowIndex, index)
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>

                <div className="d-flex flex-row">
                  {isAddingSubject ? (
                    <Fragment>
                      <Form.Select
                        value={selectedSubjectId}
                        onChange={(e) => {
                          setSelectedSubjectId(parseInt(e.target.value) || "");
                          setSelectedSubjectName(
                            classSelectors.getSubjectName(
                              subjectList.find(
                                (s) =>
                                  classSelectors.getClassSubjectId(s) ===
                                  parseInt(e.target.value)
                              )
                            ) || ""
                          );
                        }}
                        required
                      >
                        <option value="">--Please Select Subject--</option>
                        {subjectList.map((subject) => (
                          <option
                            key={
                              "cs" + classSelectors.getClassSubjectId(subject)
                            }
                            value={classSelectors.getClassSubjectId(subject)}
                          >
                            {classSelectors.getSubjectName(subject)}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Select
                        required
                        value={selectedStartingSlot}
                        onChange={(e) =>
                          setSelectedStartingSlot(
                            parseInt(e.target.value) || ""
                          )
                        }
                      >
                        <option value="">---Please Select Slot--</option>
                        {[...Array(12).keys()]
                          .map((e) => e + 1)
                          .filter(
                            (day) =>
                              !unavailableTimeslots[rowIndex].includes(day)
                          )
                          .map((slot) => (
                            <option value={slot} key={slot}>
                              {slot}
                            </option>
                          ))}
                      </Form.Select>
                      <Form.Select
                        required
                        value={selectedNoOfSlot}
                        onChange={(e) =>
                          setSelectedNoOfSlot(parseInt(e.target.value) || "")
                        }
                      >
                        <option value="">
                          --Please Select No. of Slot(s)--
                        </option>
                        {selectedStartingSlot &&
                          [...Array(4).keys()]
                            .map((e) => e + 1)
                            .filter((day) => {
                              return (
                                selectedStartingSlot + day - 1 <= 12 &&
                                !(
                                  unavailableTimeslots[rowIndex].includes(
                                    selectedStartingSlot + day - 1
                                  ) ||
                                  (day > 1 &&
                                    unavailableTimeslots[rowIndex].includes(
                                      selectedStartingSlot + day - 2
                                    )) ||
                                  (day > 2 &&
                                    unavailableTimeslots[rowIndex].includes(
                                      selectedStartingSlot + day - 3
                                    )) ||
                                  (day > 3 &&
                                    unavailableTimeslots[rowIndex].includes(
                                      selectedStartingSlot + day - 4
                                    ))
                                )
                              );
                            })
                            .map((slot, index) => (
                              <option value={slot} key={"nos" + index}>
                                {slot}
                              </option>
                            ))}
                      </Form.Select>
                      <Button
                        onClick={() => {
                          setIsAddingSubject(false);
                          setSelectedSubjectId("");
                          setSelectedStartingSlot("");
                          setSelectedNoOfSlot("");
                        }}
                        variant="light"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          addSubjectToTimetable(rowIndex);
                        }}
                        disabled={isAddButtonDisabled()}
                      >
                        Add
                      </Button>
                    </Fragment>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsAddingSubject(true);
                      }}
                    >
                      Add Subject
                    </Button>
                  )}
                </div>
              </div>
            </Collapse>
          </Fragment>
        ))}
      </Card>
    </div>
  );
};

export default EditClassTimetable;
