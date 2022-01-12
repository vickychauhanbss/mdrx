import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import {AuthContext} from '../Utils/AuthContext';
import {EmailVerify, loginAction} from '../redux/actions/registerAction';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {fontFamily} from '../Utils/fonts';
import { Regex } from '../Utils/Constant';
import Toast from 'react-native-toast-message';


import { moderateScale, scale } from 'react-native-size-matters';

const {height, width} = Dimensions.get('window');
const ExistingUser = ({navigation, props}) => {
//   const {user, token} = useContext(AuthContext);
//   const {setUser, setToken} = useContext(AuthContext);
  const {setUser, setToken, setLogout} = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [pin, setPin] = useState('');

  const [show, setshow] = useState(false);
  const [error, seterror] = useState(''); 
  const [error1, seterror1] = useState('');

  const [enable, setenable] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [submit, setSubmit] = useState(false);


  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };
  const emailValidiation = () => {
    if (email.length) {
      if (Regex.EMAIL_REGX.test(email.trim())) {
        setValidEmail(false);
      }
      else {
        setValidEmail(false);
      }
    }
  };
    const loginCheck = () => {
      setSubmit(true)

    if (email == '') {
      // alert( 'Please enter your email address.')
      return false;

    } else if (!Regex.EMAIL_REGX.test(email.trim())) {
      // alert('Please enter a valid email address');
      setValidEmail(true);

      return false;
    } else if (pin.length == '') {
      // alert('Enter 4 Digit PIN');
      return false;
    }

      var Form = new FormData();
      Form.append('email', email.trim());
      Form.append('password', pin);
      EmailVerify(Form).then(response => {
        if (response.status== 200) {
          navigation.navigate('OTPScreen', {username: response.data.fname, email: email.trim(), pin: pin})                                        
          
  
        } else {

          alert('Invalid Credentials')
          // setshow(true);
          // seterror('You are not registered with us. Sign up now.')

        }
      });
    };
  return (
    <SafeAreaView contentContainerStyle={{flex:1}} style={styles.container}>
      <View style={styles.subcontainer}>

        <View style={{width: '32%', alignContent:'center', alignItems:'center', alignSelf:'center'}}>
            <Image source={require('./../Assets/mdrxlogo.png')} style={{height: scale(50),width:scale(50)}}/>
        </View>
        <View style={{width: '68%'}}>
          <Text style={styles.mdxtxtinner}>MdRx</Text>   
          <View style={{ alignSelf:'center', alignContent:'center', marginHorizontal:20, alignItems:'center'}}> 
              <Text style={{color: '#fff', fontFamily: fontFamily.Regular, fontSize: moderateScale(14), textAlign:'center'}}>Your Cloud Based Personal Health Record System</Text>
          </View>
        </View>
      </View>


      
      <ScrollView style={{flex:0.9,  alignSelf:'center', marginTop:20}}>
        <View style={{borderWidth:1, borderColor:'#2e99c2',  borderRadius:8, width: width - width *0.1, paddingBottom:20}}>
          <View style={{padding:20}}>
             <Text style={{top:10,left:10,bottom: 1, fontSize: moderateScale(16), fontFamily: fontFamily.Regular, color:'#444444', fontWeight:'600'}}>
                Email Address
              </Text>
              <TextInput value={email}
              placeholder='Email'
              autoCapitalize='none'

              
                onChangeText={text => {
                  setemail(text);
                  if(text.length >0){
                    setenable(true)
                    setValidEmail(false);
                    setshow(false);

                  }
                  else{
                    setenable(false)
                    setValidEmail(false)
                  }
                  
                }}
                onBlur={() => {
                  email ? emailValidiation() : null;
                }}
                style={{
                  // borderBottomWidth: 1,
                  top:20,
                  left:10,
                  width: width - 100,
                  height: 50,
                  padding: 10,

                fontFamily:fontFamily.Regular,
                fontSize:16,
                borderRadius:4,
                borderWidth:1,
                color:  'gray',
                borderColor: validEmail ? 'red':'#DDDDDD',
                //borderWidth: show ? 0.6 :0

                }}
              />

          {
            email == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:'10%', bottom:-14}}>{'Email address is required'}</Text> : null
          }

          {
            validEmail && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:'10%', bottom:-14}}>{'Please enter a valid email address'}</Text> : null
          }


          </View>


          <View style={{marginHorizontal:20, marginVertical:10, position:'relative'}}>
             <Text style={{top:10,left:10,bottom: 1, fontSize: moderateScale(16), fontFamily: fontFamily.Regular, color:'#444444', fontWeight:'600'}}>
                Enter 4 Digit PIN
              </Text>
              <TextInput value={pin}
              placeholder='PIN'
              keyboardType={'number-pad'}
              secureTextEntry={true}
              maxLength={4}
              
                onChangeText={text => {
                  setPin(text);
                }}

                style={{
                  // borderBottomWidth: 1,
                  top:20,
                  left:10,
                  width: width - 100,
                  height: 50,

                fontFamily:fontFamily.Regular,
                fontSize:16,
                borderRadius:4,
                borderWidth:1,
                borderColor:'#DDDDDD',
                color: 'gray',
                padding: 10,

                }}
              />

          {
            pin == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:10, bottom:0}}>{'Enter 4 digit PIN'}</Text> : null
          }


              <TouchableOpacity style={{ justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end', marginTop:25, right:5}}  onPress={() => {  navigation.navigate('ForgetPin')}}> 
                <Text style={{color: '#0EA1D8', fontFamily:fontFamily.Bold,fontSize: moderateScale(14)}}>
                  Forgot PIN
                </Text>
              </TouchableOpacity>



          
          </View>
      
    
        <View style={{alignSelf:'center', alignItems:'center', marginTop:15, position:'relative'}}>

      

      
          {/* <TouchableOpacity  > */}
              <TouchableOpacity
                style={{
                  height: width * 0.13,
                  width: width -100,
                  // backgroundColor: '#0EA1D8',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  elevation:4,
                  marginTop:10,
                  backgroundColor:'#0EA1D8'
                }} onPress={() =>loginCheck()}>
                  {/* <LinearGradient  
                      start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                      locations={[0,0,1]}
                      colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                      style={styles.linearGradient}> */}
                      <Text style={styles.buttonText}>
                        NEXT
                      </Text>
                    {/* </LinearGradient> */}
                {/* <Text style={{color: 'white', fontFamily:fontFamily.Regular}}>Login</Text> */}
              </TouchableOpacity>
            {/* </TouchableOpacity> */}
        
          <Text style={{fontFamily:fontFamily.Regular, fontSize: moderateScale(14),top:30, fontWeight:'600'}}>Don't have any account ? </Text>

            <TouchableOpacity onPress={() => {
                  setLogout(true);
                  navigation.navigate('Signup');
                }}>
              <View
                style={{
                  height: width * 0.13,
                  width: width -100,
                  borderColor:'#0EA1D8',
                  borderWidth:1,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  //elevation:4,
                  marginTop:40,
                }}>
                <Text style={{color: '#0EA1D8', fontFamily:fontFamily.Regular, fontSize:moderateScale(14), fontWeight:'500'}}>Register Now</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExistingUser;


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff'
  },

  subcontainer: {
    backgroundColor:'#0EA1D8',
    justifyContent:'center',
    alignItems:"center", 
    height:'30%', 
    flexDirection: 'row'
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
    // borderBottomWidth:1,
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
    margin: 15,
    color: '#ffffff',
    backgroundColor: 'transparent',
    color: 'white', 
    fontFamily:fontFamily.Regular,
    fontWeight:'600'
  },
});
