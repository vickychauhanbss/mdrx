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
  StyleSheet
} from 'react-native';
import Styles from '../Components/Styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Medical from 'react-native-vector-icons/FontAwesome5';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../Utils/AuthContext';
import {loginAction} from '../redux/actions/registerAction';
import { Icon } from 'react-native-vector-icons/Icon';
import { fontFamily } from '../Utils/fonts';
import { Keyboard } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';


const {height, width} = Dimensions.get('window');
const Login1 = ({navigation, route}) => {
  const {user, token} = useContext(AuthContext);
  const [show, setshow] = useState(false);
  const [otp, setotp] = useState('');
  const [name , setname] = useState(route.params.username? route.params.username :'')

  const loginCheck = () => {
    if (otp === '') {
      alert('Please enter your 4 digit pin');
    } else {
      var form = new FormData();
      form.append('email', route.params.email);
      form.append('password', otp);
      loginAction(form).then(response => {
        console.log('response123456', response.status);
        // if (response.status === 200) {
          navigation.navigate('OTPScreen', {email: route.params.email, pin: otp}),
          Toast.show('Check your email and enter the Otp ', Toast.LONG);
        // }
        // else {
        //   showAlert();
        //   // Toast.show('please try to register with us', Toast.LONG);
        // }
      });
    }
  };
  const showAlert = () => {
    Alert.alert(  
        'Unauthorized access',
        'You enter the wrong Pin',  
        [  
            {text: 'Forgot Pin', onPress: () =>    navigation.navigate('ForgotPin', {email: route.params.email})},  
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
  return (
    <View style={{flex: 1, backgroundColor:'#fff'}}>
      <View
      style={{
        zIndex: 1,
        top: '7%',
        width:'100%',
        position:'absolute',
      }}>
      <Text style={{color:'#fff', zIndex: 1, top: 2, fontFamily:fontFamily.Bold, fontSize:moderateScale(18),textAlign: 'center',justifyContent: 'center', alignItems:'center'}}>
        Welcome {name}
      </Text>
      </View>
      <View
        style={{
          //   flex: 1,
          height: height / 4,
          width: width,
          backgroundColor: '#0EA1D8',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>


      <View
        style={{
          height: height / 10,
          width: width - 60,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>


          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:"center",width:width-80}}>
            <View style={{marginRight:20}}>
                <Image source={require('./../Assets/images/mdrxlogo.png')} style={{height: scale(50),width:scale(50)}}/>
            </View>
            <View>
                <Text style={{color: '#5A6262', fontFamily: fontFamily.Bold, fontSize: moderateScale(16)}}>
                &nbsp;&nbsp;Enter Your PIN</Text>
            </View>
          </View>


          </View>
          </View>

          <View style={{marginHorizontal:'7%', marginTop:'10%'}}><Text style={{textAlign:'center', fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>{'Enter your PIN to send one time password (OTP) code on your email address'}</Text></View>


        {/* <Text
          style={{
            color: '#5A6262',
            top: width * 0.06,
            zIndex: 1,
        fontFamily:fontFamily.Regular,
          }}>
          ENTER YOUR PIN
        </Text> */}
        <View
          style={{
            height: height * 0.06,
            width: '100%',
            backgroundColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:20
            
          }}>
          <OTPInputView
            style={{width: width * 0.6, height: width * 0.5}}
            pinCount={4}
            autoFocusOnLoad={true}
            keyboardType={'number-pad'}
            // clearInputs
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              borderBottomWidth: 1,
              color: 'black',

            }}
            secureTextEntry={true}
            onCodeChanged={code => {
              if(code.length < 4){
                setshow(false)
              }
            }

            }
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              setotp(code);
             
              if(code.length===4){
                setshow(true)
              }
              else{
                setshow(false)
              }
            }}
            codeInputHighlightStyle={{borderColor: '#0EA1D8'}}
          />
        </View>
     

      <View style={{height: height / 5,  backgroundColor:'#fff'}}>
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          {console.warn(show)}
         
          <Text
            onPress={
              () =>
              navigation.navigate('ForgetPin', {email: route.params.email})
              // )
            }
            style={{
              color: '#0EA1D8',
              fontSize: moderateScale(18),
              fontFamily: fontFamily.Regular,
              textAlign:'right',
              top:100,
            }}>
            Forgot PIN ?
          </Text>
          {/* </View> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    

      <View
        style={{
          // height: height * 0.35,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={
            () => loginCheck()
            // navigation.navigate('Home')
          }>
          <View
            style={{
              // height: width * 0.5,
              padding:20,
              width: '95%',
              // backgroundColor: '#0EA1D8',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              elevation:4,
              // marginTop:2,
            }}>
              {/* <LinearGradient  
                    start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                    locations={[0,0,1]}
                    colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                    Send One Time Password
                    </Text>
                  </LinearGradient> */}
            {/* <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Bold}}>
              Next
            </Text> */}
          </View>
        </TouchableOpacity>

      </View>
      {/* <View
        style={{
          height: 70,
          width: width,
          backgroundColor: '#12D5DB',
          top: 70,
          justifyContent: 'center',
        }}></View> */}
    </View>
  );
};

export default Login1;

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
    backgroundColor: 'transparent',
    color: 'white', 
    fontFamily:fontFamily.Regular,
    fontWeight:'600'
  },
});
