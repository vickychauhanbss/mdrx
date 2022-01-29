import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Button, Alert, } from 'react-native'
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
// import { Screen } from 'react-native-screens';
import PaymentDetails from '../../Components/PaymentDetails';
import { GET_PAYMENT_SHEET, REFRESH_SUBSCRIPTION, SAMPLE_USER_TOKEN } from '../../apis';

import {AuthContext} from '../../Utils/AuthContext';


const CardDetails = ({ route, navigation }) => {

  const { planType, durationType } = route.params;
  const {user, token, cookies } = useContext(AuthContext);

  console.log('planType++++++', planType)
  console.log('durationType++++++', durationType)
  console.log('cookies++++++', cookies)



  const data = JSON.stringify({
    "plan-type": planType,
    "duration-type": durationType
  })

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setclientSecret] = useState('')

  const fetchPaymentSheetParams = async () => {

    const response = await fetch(GET_PAYMENT_SHEET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      "Connection":"keep-alive"

      },
      body: data
    });
    console.log(response, 'response')
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    setclientSecret(paymentIntent)

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey,  customer } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'testing'
    });

    console.log('error++++++++', error);
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {


      const response = await fetch(REFRESH_SUBSCRIPTION, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${SAMPLE_USER_TOKEN}`,
           "Connection":"keep-alive"

        }
      });
      console.log(response, 'response')

      if(response.ok){
        console.log("Successfully refreshed")
      }
      else{
        console.log("Not refreshed")
      }


      Alert.alert('Success', 'Your account subscription is successful.',[
        { text: "OK", onPress: () => navigation.navigate("Dashboard", {
          subs_updated: true
        }) }
      ]);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    // <Screen>

      <PaymentDetails  
        planType={planType}
        durationType={durationType}
        planPrice={planType === 'Basic' && durationType === 'Monthly' ? "$1.99" : planType === 'Basic' && durationType === 'Annual' ? '$19.99' : planType === 'Advanced' && durationType === 'Annual' ? '$39.99 ' : '$3.99'}
        loading={loading}
        openPaymentSheet={openPaymentSheet}
        navigation={navigation}
      />

    // </Screen>
  );
}

export default CardDetails

const styles = StyleSheet.create({})