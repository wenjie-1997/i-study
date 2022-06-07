import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import * as classSelectors from "../../../selectors/class";
import * as subjectSelectors from "../../../selectors/subject";
import * as timetableSlotSelectors from "../../../selectors/timetableSlot";
import { DAYS } from "../../../utilities/constants";

const FailedResponseModal = ({ showModal, onCloseModal }) => {
  const classModal = useSelector((state) => state.class);
  const failedRequest = classSelectors.getFailedResponse(classModal);
  const unavailableSlotList =
    classSelectors.getUnavailableSlotList(failedRequest);
  const crashedSlotList = classSelectors.getCrashedSlotList(failedRequest);

  console.log(unavailableSlotList, crashedSlotList);
  return (
    <Modal size="lg" show={showModal} scrollable>
      <Modal.Header style={{ justifyContent: "center" }}>
        <b>Timetable Updated with Failed Response(s)</b>
      </Modal.Header>
      <Modal.Body className="mx-3 my-2">
        The timetable slot(s) that is/are failed to update are as follows:
        <ul>
          {unavailableSlotList.map((slot, index) => {
            console.log(crashedSlotList[index]);
            const crashedSlot = crashedSlotList[index];
            const unavailableSubjectName = subjectSelectors.getName(slot);
            const unavailableDay = DAYS[timetableSlotSelectors.getDay(slot)];
            const unavailableStartingSlot =
              timetableSlotSelectors.getStartingSlot(slot);
            const unavailableNoOfSlots =
              timetableSlotSelectors.getNoOfSlots(slot);
            const teacherName = subjectSelectors.getTeacherName(crashedSlot);
            const crashedSubjectName =
              subjectSelectors.getSubjectName(crashedSlot);
            const crashedDay = DAYS[timetableSlotSelectors.getDay(crashedSlot)];
            const crashedStartingSlot =
              timetableSlotSelectors.getStartingSlot(crashedSlot);
            const crashedNoOfSlots =
              timetableSlotSelectors.getNoOfSlots(crashedSlot);

            return (
              <li key={index}>
                {`${unavailableSubjectName} on ${unavailableDay} ${
                  unavailableNoOfSlots === 1
                    ? `on Slot ${unavailableStartingSlot}`
                    : `from Slot ${unavailableStartingSlot} to Slot ${
                        unavailableStartingSlot + unavailableNoOfSlots - 1
                      } `
                } by ${teacherName}`}

                <ul>
                  <li
                    style={{ color: "red" }}
                  >{`Crashing slot: ${crashedSubjectName} on ${crashedDay} ${
                    crashedNoOfSlots === 1
                      ? `on Slot ${crashedStartingSlot}`
                      : `from Slot ${crashedStartingSlot} to Slot ${
                          crashedStartingSlot + crashedNoOfSlots - 1
                        } `
                  }`}</li>
                </ul>
              </li>
            );
          })}
        </ul>
        <br />
        <Button onClick={onCloseModal}>Close</Button>
      </Modal.Body>
    </Modal>
  );
};

export default FailedResponseModal;
