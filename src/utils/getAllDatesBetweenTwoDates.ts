import moment, { Moment } from "moment";

const getDates = (startDate: Moment) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= moment()) {
    if (dateArray.length > 0) {
      const date = currentDate.toDate();
      date.setHours(0);
      date.setMinutes(0);
      dateArray.push(date);
      currentDate = moment(date).add(1, "days");
    } else {
      dateArray.push(currentDate);
      currentDate = moment(currentDate).add(1, "days");
    }
  }
  return dateArray;
};

export default getDates;
