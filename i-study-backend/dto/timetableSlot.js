module.exports = {
  timetableSlotToDto: ({
    timetable_slot_id,
    class_subject_id,
    day,
    starting_slot,
    no_of_slots,
  }) => ({
    ...(timetable_slot_id && { timetableSlotId: timetable_slot_id }),
    ...(class_subject_id && { classSubjectid: class_subject_id }),
    ...(day && { day }),
    ...(starting_slot && { startingSlot: starting_slot }),
    ...(no_of_slots && { noOfSlots: no_of_slots }),
  }),
};
