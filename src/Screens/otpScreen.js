import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,Button,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Styles from '../Components/Styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Medical from 'react-native-vector-icons/FontAwesome5';

import { fontFamily } from '../Utils/fonts';
import { loginAction, OtpVerify, EmailVerify } from '../redux/actions/registerAction';
import { AuthContext } from '../Utils/AuthContext';
import CountDown from '../Components/counter';


import { moderateScale, scale } from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';

import Toast from 'react-native-simple-toast';
const {height, width} = Dimensions.get('window');
const OTP = ({route, navigation}) => {
  console.log('route+++++++', route);
  const [otp, setotp] = useState('');
  const {user, token} = useContext(AuthContext);
  const {setUser, setToken, setCookies} = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true)
  const [disable , setdisable]=useState(false)
  const [counter, SetCounter] = useState(60); // Set here your own timer configurable
  const [random, SetRandom] = useState(Math.random());
const[show, setshow]= useState(false);

const handleResend = () => {
  setDisabled(true)
  SetRandom(Math.random())
  var form = new FormData();
      form.append('email', route.params.email);
      form.append('password', route.params.pin);
      loginAction(form).then(response => {
        console.log('response123456', response.status);
        if (response.status === 200) {
         Alert.alert('Your One Time Password (OTP) has been resent to your registered email address')
          // Toast.show('Your One Time Password (OTP) has been sent to your registered email address ', Toast.LONG);
        }
        else {
        
          Toast.show('You are not registered with us. Sign up now.', Toast.LONG);
        }
      });
    // }
  // Handle Resend otp action here
}
  const showAlert = () => {
    Alert.alert(  
        'PIN Authentication Failed',
        'You enter the wrong PIN',  
        [  
            // {text: 'Resend  Otp', onPress: () => console.log('Ask me later pressed')},  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ],  
        {cancelable: false}  
    )  
}  
  const loginCheck = () => {
    if (otp === '') {
        alert('Enter your One time password. Check your email box including spam folder or press resend link.')
    } else {
      var form = new FormData();
      form.append('email', route.params.email);
      form.append('password', route.params.pin);
      form.append('otp', otp);
      OtpVerify(form).then(response => {
        console.log('response123456', response);

        if (response.status ==200) {
          setToken(response.data.key);    
          setUser(response.data.user);
          // setCookies(response.data.cookies)
       
          console.log('checkuserSignin', response.data.user);
          Toast.show('Successful Login', Toast.LONG);
          //  navigation.navigate('Dashboard')

        } else {
          showAlert();
          setshow(true);
        }
      });
    }
  };


  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      {/* <Text style={{position: 'absolute', zIndex: 1, top:5, left:5, fontFamily:fontFamily.Bold, fontSize:17, padding:5, color:'#fff'}}>Two-Step-Verification</Text>
      <Text style={{position: 'absolute', zIndex: 1, top:30, left:5, fontFamily:fontFamily.Regular, fontSize:16, padding:5, margin:5,color:'#fff'}}>For added security, Please enter the one time password that has been sent to your email</Text> */}


      <View
      style={{
        zIndex: 1,
        top: '10%',
        width:'100%',
        position:'absolute',
      }}>
        <Text style={{color:'#fff',fontSize: moderateScale(18),fontFamily: fontFamily.Regular,textAlign: 'center',justifyContent: 'center',alignItems:'center',fontWeight:'600'}}>Two-Step-Verification</Text>
      
    </View>


      
      <View  style={{ height: height / 3.6, width: width, backgroundColor: '#0EA1D8', justifyContent: 'flex-end', alignItems: 'center'}}>

       
    <TouchableOpacity  style ={{ left:10, height:25,width:20, position:'absolute', left: 0, top:20}} onPress={() => navigation.goBack(null)}>
              <Image source={require('../Assets/back_white.png')}  style={{height: scale(30), width: scale(30)}} />
            </TouchableOpacity>

           <View style={{
              height: height / 8,
              width: width - 60,
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:"center",width:width-80}}>
                  <View style={{marginRight:15}}>
                      <Image source={require('./../Assets/images/mdrxlogo.png')} style={{height:50,width:50}}/>
                  </View>
                  <View>
                      <Text style={{color: '#5A6262', fontFamily: fontFamily.Bold,fontSize: moderateScale(15)}}>
                      ENTER YOUR OTP</Text>
                  </View>
              </View>
            </View>
        </View>

        <View style={{marginHorizontal:'10%', marginTop:'10%'}}><Text style={{textAlign:'center', fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>{'Enter one time password (OTP) code sent to your email address'}</Text></View>
        <View
          style={{
            height: height / 8,
            width: width - 20,
            backgroundColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OTPInputView
            style={{width: '60%', height: 200}}
            pinCount={5}
            // autoFocusOnLoad={true}
            // clearInputs
            // autoFocus={true}
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              borderBottomWidth: 1,
              color: show ? 'red': 'black',
              borderColor: show ?'red': '#03DAC6',
              
            }}
            onCodeChanged={code => {
              if (code.length < 5) {
                setdisable(false)
              }
            }

            }
            secureTextEntry={true}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              setotp(code);
              // if(code.length===5){
              //   setdisable(true)
              // }
              // else{
              //   setdisable(false)
              // }
            }}
            codeInputHighlightStyle={{borderColor: show ?'red': '#03DAC6'}}
          />
        </View>
      

      <View style={{height: height / 3, top: width * 0.03, backgroundColor:'#fff'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View  style={{flexDirection:'row', top: width  * 0.02}}>
          <Text style={{fontFamily: fontFamily.Regular, fontSize: moderateScale(14)}}>Resend OTP In </Text>
          <View style={{marginTop:1}}>
         <CountDown
            key={random}
            until={counter}
            size={15}
            onFinish={() => setDisabled(() => false)}
            separatorStyle={{ color: 'black', }}
            digitStyle={{ backgroundColor: '#FFF'  }}
            digitTxtStyle={{ color: 'black' }}
            timeToShow={['S']}
            // timeLabels={{ s: '' }}
          />
          </View>
          <Text style={{fontFamily: fontFamily.Regular, fontSize: moderateScale(14)}}> Seconds</Text>
          </View>
       
      <TouchableOpacity disabled={disabled} style={{top:width * 0.04}} onPress={handleResend}>
      <Text style={{color:'#0EA1D8', fontFamily: fontFamily.Regular , opacity: disabled ? 0.3: 1, fontSize: width * 0.035}}>Resend</Text>
        </TouchableOpacity>    

        </View>
      </View>
   


      
      {/* <View
        style={{
          // height: height * 0.35,
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop:100,
          // paddingBottom:150
        }}> */}
        <TouchableOpacity
          onPress={
            () => loginCheck()
            // navigation.navigate('Home')
          } style={{ alignItems: 'center',
          justifyContent: 'center'}}>
          <View
            style={{
              // height: width * 0.5,
              // padding:10,
              width: '80%',
              backgroundColor: '#0EA1D8',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              // elevation:4,
              // marginTop:2,
            }}>
              {/* <LinearGradient  
                  start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                  locations={[0,0,1]}
                  colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                  style={styles.linearGradient}> */}
                  <Text style={styles.buttonText}>
                  VERIFY OTP
                  </Text>
              {/* </LinearGradient> */}
          </View>
        </TouchableOpacity>

      {/* </View> */}


     
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff'
  },

  subcontainer: {
    // backgroundColor:'#2e99c2',
    justifyContent:'center',
    alignItems:"center", 
   marginTop:10,
    flexDirection: 'row',
    width:'100%',
  },

  topView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center"
  },

  mdxTxt:{
    flexDirection:'row',justifyContent:'center',alignContent:'center'
  },

  mdxtxtinner:{
    // width:120,
    color: '#fff',
    fontFamily: fontFamily.Regular,
    fontSize: moderateScale(20),
    borderBottomColor:'#fff',
    borderBottomWidth:1,
    // textAlign:'center', 
    textDecorationLine: 'underline',
    marginBottom:10,
    textAlign:'center',
    marginRight:'20%'
  },
  

  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  item: {
    flex: 1,
    height:60,
    backgroundColor: '#F7F7F7',
    borderRadius:5,

    padding: 10,
    // marginHorizontal: 5,
    flexDirection:'row',
    elevation:2,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    // paddingBottom:8,
    // paddingTop:8,
    borderRadius: 5,
    
  },

  buttonText: {
    fontSize: moderateScale(16),
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: '#ffffff',
    // backgroundColor: 'transparent',
    // color: 'white', 
    fontFamily:fontFamily.Regular,
    fontWeight:'600'
  },
});
