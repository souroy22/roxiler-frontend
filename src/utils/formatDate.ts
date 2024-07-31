export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format day and month with leading zero if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Return the formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`;
};
