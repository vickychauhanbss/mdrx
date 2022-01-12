import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {fontFamily} from '../Utils/fonts';
import { Regex } from '../Utils/Constant';
import { moderateScale, scale } from 'react-native-size-matters';
import { ResetPin } from '../redux/actions/registerAction';


const {height, width} = Dimensions.get('window');
const ForgetPin = ({navigation, route}) => {
  const [email, setemail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };
  const emailValidiation = () => {
    if (email.length) {
      if (Regex.EMAIL_REGX.test(email)) {
        setValidEmail(true)
      
      }
      else {
        setValidEmail(false);
        seterror1('Please enter a valid email address')

    ReactNativeHapticFeedback.trigger("impactLight", options);
      }
    }
  };
  const showAlert=()=> {  
    Alert.alert(  
        'PIN Reset',  
        'PIN reset link has been sent on your email address',  
        [  
            // {  
            //     text: 'Cancel',  
            //     onPress: () => console.log('Cancel Pressed'),  
            //     style: 'cancel',  
            // },  
            {text: 'OK', onPress: () =>   navigation.navigate('ExistingUser')},  
        ]  
    );  
}  

    const loginCheck = () => {
    
    if (email == '') {
      alert( 'Email address is required.')
      return false;

    } else if (!Regex.EMAIL_REGX.test(email)) {
      alert('Please enter a valid email address. ');
      return false;
    }
      var Form = new FormData();
      Form.append('email', email);
      ResetPin(Form).then(response => {
          console.log('response123456', response.data);
          if (response.status== 200) {
        // alert('hiiii')

        showAlert();
      
            
    
          } else {
           setshow(true);
           seterror('You are not registered with us. Sign up now.')

          }
        });
      // }
      
    };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} contentContainerStyle={{flex: 1}}>
       <View  style={{
            width: width,
            height: height * 0.06,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:'#FFF',
            marginTop:'8%',
            paddingBottom:20,
            borderBottomWidth: 1,
            borderBottomColor: '#D0D0D0',
          }}>
            <TouchableOpacity  style ={{ left:10, height:25,width:20}} onPress={() => navigation.goBack(null)}>
              <Image source={require('../Assets/back.png')}  style={{height: scale(20), width: scale(20)}} />
            </TouchableOpacity>
        </View>
      <View style={{ alignSelf:'center'}}>
      <Text style={{ fontSize: 18, fontFamily: fontFamily.Bold, color:'black', marginTop:'10%'}}>
          Forgot PIN
        </Text>
       </View>
      <View style={{ alignSelf:'center', marginHorizontal:20}}>
     
      <Text style={{padding: 20, fontSize: 18, fontFamily: fontFamily.Regular, textAlign:'center'}}>
        Enter your registered Email Address. we'll send you an email to reset your PIN 
      </Text>
      </View>
      <View style={{ alignSelf:'center', marginTop:'10%'}}>
    
        <Text
          style={{bottom: 10, fontSize: 16, fontFamily: fontFamily.Regular}}>
          {' '}
          Email Address
        </Text>
        <TextInput value={email}
              placeholder='Email'
              autoCapitalize='none'

              
                onChangeText={text => {
                  setemail(text);
                  if(text.length >0){
                    // setenable(true)
                    setValidEmail(true);
                    // setshow(false);
                    // setValidEmail(true)

                  }
                  else{
                    // setenable(false)
                    setValidEmail(false)
                  }
                  
                }}
                onBlur={() => {
                  email ? emailValidiation() : null;
                }}
                style={{
                  // borderBottomWidth: 1,
                  top:10,
                  // left:10,
                  width: width - 80,
                  height: 50,
                  padding: 10,

                fontFamily:fontFamily.Regular,
                fontSize:16,
                borderRadius:4,
                borderWidth:1,
                color: 'gray',
                borderColor:'#DDDDDD',
                //borderWidth: show ? 0.6 :0

                }}
              />
           
      </View>
      
    
      <View style={{marginHorizontal:40, marginTop:'10%'}}>
      <TouchableOpacity onPress={() =>loginCheck()}>
            <View
              style={{
                height: width * 0.13,
                width: '100%',
                backgroundColor: '#55b1f7',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf:'center',
                alignContent:'center',
                flexDirection: 'row',
                elevation:4,
                // opacity: enable ? 1 : 0.4
              }}>
                {console.warn(route.params)}
              <Text  style={{color: 'white', fontFamily:fontFamily.Bold}}>Send Email</Text>
            </View>
          </TouchableOpacity>
      
        

       
      </View>

    

     {/* <View
        style={{
          height: height * 0.06,
          width: width,
          justifyContent: 'center',
          backgroundColor: '#0EA1D8',
          bottom: 0,
          position:'absolute'
        }}
      /> */}
    </SafeAreaView>
  );
};

export default  ForgetPin;
