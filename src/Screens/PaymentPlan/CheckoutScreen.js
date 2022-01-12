import React, {
    useCallback, useState,
  } from 'react';
  import {
    useFocusEffect,
  } from '@react-navigation/native';
  import { WebView } from 'react-native-webview';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    View, BackHandler, Text, TouchableOpacity, ActivityIndicator,
  } from 'react-native';
  import { checkoutStyles } from './Style';
  const CheckoutScreen = ({
    navigation, route
  }) => {
    const { url} = route.params;
    // alert(paymentData);
  
    const hardwareBackPressCustom = useCallback(() => {
      // navigation.navigate('Dashboard');
      return true;
    }, []);
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressCustom);
      };
    }, []);
 
//     const htmlContent = `
//     <HTML>
//     <BODY OnLoad="OnLoadEvent();" >
//     <form name="form1" action="https://uat.letzpay.com/pgui/jsp/paymentrequest" method="post">
  
//     <input type="hidden" name="PAY_ID" value="${paymentData.payid}">
//     <input type="hidden" name="ORDER_ID" value="${paymentData.txnid}">
//     <input type="hidden" name="AMOUNT" value="${paymentData.amount}">
//     <input type="hidden" name="CUST_ID" value="${paymentData.patientUhid}">
//     <input type="hidden" name="PRODUCT_DESC" value="${paymentData.productinfo}">
//     <input type="hidden" name="TXNTYPE" value="${paymentData.txnType}">
    
//     <input type="hidden" name="CURRENCY_CODE" value="${paymentData.currencyCode}">
//     <input type="hidden" name="RETURN_URL" value="${paymentData.surl}">
  
//     <input type="hidden" name="HASH" value="${paymentData.hash}">
//     </form>
//   <script language="JavaScript">function OnLoadEvent()
//   {document.form1.submit() ;}</script>
//   </BODY>
//   </HTML>`;
    // console.log('checkout', route.params);
    // console.log('checkout=====>>>>', appointmentSuccessObj.bookingSuccessData);
    const ActivityIndicatorElement = () => {
      return (
        <View style={checkoutStyles.activityIndicatorStyle}>
          <Text style={checkoutStyles.pleasewait}>Please wait...</Text>
        </View>
      );
    };
    const [visible, setVisible] = useState(false);
    return (
      <View style={checkoutStyles.container}>
  
        <View style={checkoutStyles.headerContainer}>
          <Text style={checkoutStyles.headerText}>Checkout</Text>
        </View>
        <WebView
        //   onNavigationStateChange={(nav) => {
        //     console.log('nav url', nav.url);
        //     if (nav.url.includes('paymentSuccessError')) {
        //       navigation.navigate('BookAppointmentScreen');
        //     }
        //     if (nav.url.includes('txncancel')) {
        //       navigation.navigate('PaymentFailaure');
        //     }
        //     if (nav.url.includes('paymentSuccess')) {
        //       setVisible(true);
        //     //   navigation.navigate('BookingSuccessScreen', { successData: appointmentSuccessObj.bookingSuccessData });
        //       setVisible(false);
        //     //   resetAppointment();
        //     }
        //     if (nav.url.includes('invalid')) {
        //       navigation.navigate('PaymentFailaure');
        //     }
  
        //     if (nav.url.includes('sessionTimeout')) {
        //       navigation.navigate('Doctors Search');
        //     }
        //     else {
        //       console.log('payment process');
        //     }
        //   }}
          onNavigationStateChange={
            (nav) => {
              if(nav.url.includes('payment-success-app/')){
                setTimeout(() => {
                  navigation.navigate('Dashboard');
                }, 20000);
              }
            }
          }
          source={{ uri:url }}
          domStorageEnabled
          onLoadStart={() => setVisible(true)}
          onLoad={() => setVisible(false)}
          style={{ marginTop: 20 }}
        />
        {visible ? <ActivityIndicatorElement /> : null}
      </View>
  
    // </View>
    );
  };
  export default CheckoutScreen;
  /* <input type="hidden" name="CUST_EMAIL" value=${paymentData.email}>
  
  <input type="hidden" name="CUST_PHONE" value=${paymentData.phone}> */
  