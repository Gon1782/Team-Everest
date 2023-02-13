type time = string | number

export const getDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month: time = now.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let day: time = now.getDate();
  if (day < 10) day = "0" + day;
  let hour: time = now.getHours();
  if (hour < 10) hour = "0" + hour;
  let minute: time = now.getMinutes();
  if (minute < 10) minute = "0" + minute;

  // const [date, time] = getDate()
  // date = YYYY-MM-DD time = HH:MM
  return [`${year}-${month}-${day}`, `${hour}:${minute}`];
};