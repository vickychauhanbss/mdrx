import {StyleSheet, Dimensions} from 'react-native';
// import LocalizedStrings from 'react-native-localization';
const {height, width} = Dimensions.get('window');

export const BigTitleFontSize = height / 30;
export const TitleFontSize = height / 60;
export const ValueFontSize = height / 55;
export const ButtonFontSize = height / 60;
export const Margin = width / 20;
export const Button_Margin = height / 50;
export const MinMargin = width / 40;
export const BorderRadius = height / 200;

export default StyleSheet.create(props => ({
  container: {flex:1},
  errorText: {
    fontSize: 12,
    color: 'red',
  },
}));

export const Validations ={
    firstName: 'Please enter First Name',
    lastName: 'Please enter last Name',
    mobile: 'Please enter mobile number',
    email: 'Please enter email address',
    validFristName: 'Please enter valid first name',
    validLastName: 'Please enter valid last name',
    validMobile: 'Please enter valid mobile number',
    validEmail: 'Please enter valid email',
    validDOB: 'Please enter DOB',
    validPinCode: 'Please enter valid pincode',
   

  }
// })

