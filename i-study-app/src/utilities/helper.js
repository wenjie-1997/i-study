export const getformattedDate = (dateIsoString) => {
  const newDate = new Date(dateIsoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();
  return `${date}-${month + 1}-${year}`;
};

export const getformattedDateTime = (dateIsoString) => {
  const newDate = new Date(dateIsoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();
  let hour = newDate.getUTCHours();
  const minute = newDate.getUTCMinutes();
  const second = newDate.getUTCSeconds();
  const meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${date}-${month + 1}-${year} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second
    .toString()
    .padStart(2, "0")} ${meridiem}`;
};

export const getDateTimeLocalString = (dateIsoString) => {
  const newDate = new Date(dateIsoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();
  const hour = newDate.getUTCHours();
  const minute = newDate.getUTCMinutes();
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

export const getCurrentLocalISOString = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minute = today.getMinutes();
  // const second = today.getSeconds();
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};
export const getCurrentLocalISOFullString = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};

export const getDateDifferenceFromNow = (selectedDate) => {
  const nowTime = new Date().getTime();
  const selectedDateTime = new Date(selectedDate.replace("Z", "")).getTime();
  let second = Math.round((selectedDateTime - nowTime) / 1000);
  const overdue = second < 0;
  second = Math.abs(second);
  let minute = 0;
  let hour = 0;
  let day = 0;
  if (second >= 60) {
    minute = Math.floor(second / 60);
    second = second % 60;
    if (minute >= 60) {
      hour = Math.floor(minute / 60);
      minute = minute % 60;
      if (hour >= 24) {
        day = Math.floor(hour / 24);
        hour = hour % 24;
      }
    }
  }
  return `
  ${overdue ? "Overdue by " : ""}
  ${day !== 0 ? day + " days, " : ""}${hour !== 0 ? hour + " hour(s), " : ""}${
    minute !== 0 ? minute + " minute(s), " : ""
  }${second !== 0 ? second + " second(s)" : ""}`;
};
