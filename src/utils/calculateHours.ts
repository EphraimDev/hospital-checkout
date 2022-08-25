import moment, { Moment } from "moment";

const calculateHours = (time: Date, endTime: Moment) => {
  const checkout_time = moment(time, "HH:mm");
  const current_time = moment(endTime, "HH:mm");
  const total_minutes = current_time.diff(checkout_time, "minutes");
  const minutes = total_minutes % 60;
  let hours = Math.floor(total_minutes / 60);
  if (minutes > 0) {
    hours += 1;
  }
  return hours;
};

export default calculateHours