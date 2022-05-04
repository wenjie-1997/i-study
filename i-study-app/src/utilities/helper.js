export const getformattedDate = (dateIsoString) => {
  const newDate = new Date(dateIsoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();
  return `${date}-${month}-${year}`;
};
