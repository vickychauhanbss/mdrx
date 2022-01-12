import React, { Component, useContext, useRef, useState, useEffect,useLayoutEffect } from 'react';
import { Alert } from "react-native";
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  BackHandler,
  Platform,
  FlatList,
  TouchableWithoutFeedback,

} from 'react-native';
import Styles from '../../Components/Styles';
import { AuthContext } from '../../Utils/AuthContext';
const { height, width } = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialIcons'
import Ionic from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
import { fontFamily } from '../../Utils/fonts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WebView } from 'react-native-webview';
import {GetPaymentPlan, GetPaymentPlanReset} from  '../../redux/Reports/actions'
import { stat } from 'react-native-fs';
function PaymentPlan({
  navigation,
  paymentPlanDetail,
  paymentPlanFail,
  paymentPlanSucess,
  GetPaymentPlan,
  GetPaymentPlanReset
}) {
  const {user, token} = useContext(AuthContext);
//   const {profile,setProfile} = useContext(ProfileContext);
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});
  const [name,setName] = useState([])
  const [visible, setVisible] = useState(false);
  // App.js

 
  
  const Basic =()=>{
    const data= new FormData();
    data.append('plan-type', 'basic')
    // Alert.alert('Error:', data)
    GetPaymentPlan(data)
  }

  const ActivityIndicatorElement = () => {
    return (
      <View style={checkoutStyles.activityIndicatorStyle}>
        <Text style={checkoutStyles.pleasewait}>Please wait...</Text>
      </View>
    );
  };
 
  useEffect(() => {

    if (paymentPlanSucess) {
    navigation.navigate('Checkout',{ url:paymentPlanDetail.checkout_url})
      GetPaymentPlanReset();
    } else if (paymentPlanFail) {
      // Toast.show(
      //   'Something went wrong, please try again.',
      //   Toast.SHORT,
      //   ['UIAlertController'],
      // );
      navigation.navigate('Checkout',{ url:paymentPlanDetail.checkout_url})
      GetPaymentPlanReset();
    }
    return () => { };
  });
 

  {
    return (
      <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        
      </View>
    );
  }
}
// export default React.memo(PaymentPlan);

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
    // color: fontColor.label,
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
function mapStateToProps(state) {
  console.log('state.Login.userLoginData', state);
  return {
     paymentPlanSucess:state.report.paymentPlanSuccess,
     paymentPlanFail: state.report.paymentPlanFail,
     paymentPlanDetail:state.report.pymentPlanDetail
  
  };
}
// paymentPlanSuccess:null,
// paymentPlanFail:null,
// pymentPlanDetail:''
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
      {
     GetPaymentPlan,
     GetPaymentPlanReset
      },
      dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPlan);