/* eslint-disable import/prefer-default-export */
import {
    StyleSheet, Dimensions, PixelRatio, Platform,
  } from 'react-native';
  // import { fontColor, fontFamily } from '../../../../assets/constants/styleConstants';
 
  const { height, width } = Dimensions.get('window');
  
  const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize) - 2);
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  };
  
  export const checkoutStyles = StyleSheet.create({
  
    container: {
      // alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: fontColor.white,
      flex: 1,
      zIndex: 0,
    },
    headerContainer: {
      // marginTop: 50,
      marginHorizontal: 5,
      marginVertical: 5,
      // marginTop:5
    },
    headerText: {
      fontSize: 23,
      fontWeight: 'bold',
    //   color: fontColor.label,
      textAlign: 'center',
      marginTop: Platform.OS==='ios' ?6:0,
    },
    activityIndicatorStyle: {
      flex: 1,
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    pleasewait: {
      // position: 'absolute',
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'center',
    },
  
  });
  export const paymentFailureStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      // marginTop: 50,
      marginHorizontal: 5,
      marginVertical: 5,
    },
    failText: {
      fontSize: 23,
      fontWeight: '500',
      color: '#333',
      textAlign: 'center',
      alignItems: 'center',
  
      // marginTop: 10,
    },
    failText1: {
      fontSize: 23,
      fontWeight: '500',
      color: '#333',
      textAlign: 'center',
      alignItems: 'center',
      // marginHorizontal: 100,
      // marginVertical: 100,
  
      // marginTop: 10,
    },
    ButtonView: {
      flexDirection: 'row', left: width / 2 - 40, top: 40,
  
    },
    Button: { fontSize: 21, color: '#79AC0D' },
    cancelIcon: {
      alignSelf: 'flex-end',
      margin: 20,
      width: 25,
      height: 25,
    },
    OOPSText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      // top:100
    },
  });
  