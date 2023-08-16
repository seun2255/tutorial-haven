const timeStamp = () => {
  const date = new Date();
  var day = date.getDate();
  if (day < 10) day = `0${day}`;
  var month = date.getMonth();
  if (month < 10) month = `0${month}`;
  var year = date.getFullYear();
  var hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  var minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;

  return `${day}/${month}/${year} ${hour}:${minute}`;
};

const convertToDateTime = (timestampString) => {
  const [datePart, timePart] = timestampString.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
};

export { timeStamp, convertToDateTime };
