// const moment = require("moment");

export const Regex = {
  USER_NAME_REGX: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  EMAIL_REGX: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  PHONENO_REGX: /^[1-9][0-9]{9,14}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
  NUMBER_REGX: /^[0-9]+$/,
  mobileNumber: /^[789564]\d{9}$/,
  numberNotContain: /^([^0-9]*)$/,
  otp: /^\d{6}$/,
  alphabet: /^([^0-9]*)$/,
  pinCode: /^\d{6}$/,
  profileName: /^[A-Za-z]{3,50}$/,
  profileLastName: /^[A-Za-z]{3,50}$/,
  address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  onlyNumber: /^([0-9]*)$/,
  alphaNumeric: /^[a-zA-Z0-9\s,.'-/]{1,}$/,
  reportFileType:/(\.jpg|\.jpeg|\.png|\.pdf)$/i
};

export const NOTIFICATION_FETCH_LIMIT = 15;

export const TIME_OUT_MILLS = 30000;

export const FILE_SIZE_LIMIT = 500000; //5MB

// export const dateConvert = (date) => {
//   if (date) {
//     let TODAY = moment();
//     let YESTERDAY = moment().subtract(1, 'days');
//     let dateobj = moment(date,'DD/MM/YYYY hh:mm a');
//     console.log("Notfication date", date);
//     if (moment(dateobj).isSame(TODAY, 'day')) {
//       return `Today ${moment(dateobj).format("LT")}`;
//     } else if(moment(dateobj).isSame(YESTERDAY, 'day')) {
//       return `Yesterday ${moment(dateobj).format("LT")}`;
//     } else {
//       console.log("Notfication other", moment(dateobj).format("lll"));
//       return moment(dateobj).format("lll"); // or format it what ever way you want
//     }
//   } else {
//     return "";
//   }
// };
