import moment from "moment";
import calculateHours from "./calculateHours";

const calculateOverstayFee = (
  dates: Array<Date>,
  room_type: string,
  amount_paid: number
) => {
  let amount = 0;
  for (let i = 0; i < dates.length; i++) {
    const date = new Date(dates[i]);
    console.log(date)
    if (i === dates.length - 1) {
      const hours_overstayed = calculateHours(date, moment());
      if (date.getDay() == 6 || date.getDay() == 0) {
        if (room_type === "deluxe")
          amount += (12 / 100) * amount_paid * hours_overstayed;
        else if (room_type === "regular")
          amount += (10 / 100) * amount_paid * hours_overstayed;
        else amount += (16 / 100) * amount_paid * hours_overstayed;
      } else {
        if (room_type === "deluxe")
          amount += (8.5 / 100) * amount_paid * hours_overstayed;
        else if (room_type === "regular")
          amount += (7 / 100) * amount_paid * hours_overstayed;
        else amount += (11 / 100) * amount_paid * hours_overstayed;
      }
    } else {
      if (date.getDay() == 6 || date.getDay() == 0) {
        if (room_type === "deluxe") amount += (12 / 100) * amount_paid * 24;
        else if (room_type === "regular")
          amount += (10 / 100) * amount_paid * 24;
        else amount += (16 / 100) * amount_paid * 24;
      } else {
        if (room_type === "deluxe") amount += (8.5 / 100) * amount_paid * 24;
        else if (room_type === "regular")
          amount += (7 / 100) * amount_paid * 24;
        else amount += (11 / 100) * amount_paid * 24;
      }
    }
  }
  return amount;
};

export default calculateOverstayFee;
