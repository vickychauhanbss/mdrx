import React, {useState, useContext ,useRef, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  Linking,
  SafeAreaView,
  Button
} from 'react-native';

import {Regex} from '../Utils/Constant';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import {registerAction} from '../redux/actions/registerAction';
import {AuthContext} from '../Utils/AuthContext';
import {fontFamily} from '../Utils/fonts';
import { moderateScale, scale } from 'react-native-size-matters';
import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';

import CheckBox from 'react-native-check-box'
import KeyboardAwareScrollView from '../Components/KeyboardAwareScrollView';

import Modal from "react-native-modal";
const {height, width} = Dimensions.get('window');
const Register = () => {
  const [selectedValue, setSelectedValue] = useState();

  const [firstname, setfirstname] = useState('');
  const [username, setUserName] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const {setUser, setToken} = useContext(AuthContext);
  const [validatepin, setvalidatepin] = useState(false);
  const [validateconfirmpin, setvalidateconfirmpin] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validMobile, setValidMobile] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [getCountryLists, setCountryLists] = useState([]);
  const [errors , setErrors]=useState('')
  const [data, setdata] = useState('');
  const navigation = useNavigation();
  const [submit, setSubmit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);




const [country, setPicker] = useState({
  callingCode: ['44'],
  cca2: 'GB',
  currency: ['GBP'],
  flag: 'flag-us',
  name: 'United Kingdom',
  region: 'Europe',
  subregion: 'Northern Ireland'
});



const toggleModal = () => {
  setModalVisible(!isModalVisible);
};



// const styles = StyleSheet.create({

//   image: {
//     width: 50,
//     height: 60,
//   }
// });

useEffect(() => {
  async function fetchData() {
    const res = await fetch("http://ec2-3-99-37-134.ca-central-1.compute.amazonaws.com/api/auth/list-country/");
    res
      .json()
      .then(res => setCountryLists(res))
      .catch(err =>  console.log('check Country',err)
      );
  }

  fetchData();

});
const ShowMaxAlert = (EnteredValue) =>{
    var TextLength = EnteredValue.length.toString();

    if (TextLength ===5) {
      Alert.alert('You have reached maximum limit.');
  }


 }
  const signUpCheck = () => {

    setSubmit(true)
   if (firstname == '') {

    return false;
    } else if (lastname == '') {
      return false;
    } else if (mobile == '') {

      return false;
    } else if (isNaN(mobile)) {
      return false;
    } else if (mobile.length <= 9) {
      return false;
    }
    else if (email == '') {

      return false;
    } else if (!Regex.EMAIL_REGX.test(email)) {

      return false;
    } else if (pin.length <= 3) {
      return false;
    } else if (pin !== confirmPin) {

      return false;
    } else if (!toggleCheckBox) {
      setModalVisible(true)
      return false;
    }
    var form = new FormData();
    form.append('fname', firstname);
    form.append('lname', lastname);
    form.append('email', email);
    form.append('phone_number', mobile);
    form.append('password', pin);
    form.append('password2', pin);
    form.append('useraccount_country', country.callingCode[0]);
    form.append('tnc_flag', 1);
    registerAction(form).then(response => {
      console.log('response++++++', response);
      if (response.data && response.data.email) {
        // setUser(response.data);
        // console.log(response.data);
        Toast.show(
          'Your MdRx account has been created successfully now',
          Toast.LONG,
          // navigation.navigate('Login1', {username: firstname, email: email}),
        );

        navigation.navigate('OTPScreen', {username: firstname, email: email, pin: pin})                                        

        
      } else {
        console.log('------- working ---------')
        Toast.show('You are already registered with us. Please use forgot PIN to reset PIN', Toast.LONG);
      }
    });

  };
  const firstNameValidiation = () => {
    if (firstname) {
      if (Regex.profileName.test(firstname)) {
        setValidFirstName(false);
      }
      else {
        setValidFirstName(true);
      }
    }
    else {
      // console.warn('inhere',FirstName)

      setValidFirstName(true);
    }
  };

  const lastNameValidiation = () => {
    if (lastname) {
      if (Regex.profileLastName.test(lastname)) {
        setValidLastName(false);
      }
      else {
        setValidLastName(true);
      }
    }
    else {
      setValidLastName(true);
    }
  };
  const emailValidiation = () => {
    if (email.length) {
      if (Regex.EMAIL_REGX.test(email)) {
        setValidEmail(false);
      }
      else {
        setValidEmail(true);
      }
    }
  };
  const mobileValidiation = () => {
    if (mobile.length >=10) {
      setValidMobile(false)
    } 
      else {
        setValidMobile(true);
      }
    }


    /********* Select Country ********/
  const onSelect = country => {
    setPicker(country)
  };
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

    <ScrollView>
      <KeyboardAwareScrollView  style={{ flex: 1, marginBottom: 0 }}
          keyboardShouldPersistTaps={'always'}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          bounces={true}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: '10%',
              width: width,
              backgroundColor: '#0EA1D8',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // marginTop:50
            }}>
            <View
              style={{
                height: '70%',
                width: width - 30,
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:"center",width:width-80, marginTop:10}}>
                  <View style={{marginRight:20}}>
                      <Image source={require('./../Assets/images/mdrxlogo.png')} style={{height: scale(50),width: scale(50)}}/>
                  </View>
                  <View>
                      <Text style={{color: '#5A6262', fontFamily: fontFamily.Bold,fontSize: moderateScale(17)}}>
                      Get Started </Text>
                  </View>
                </View>

          </View>
        </View>

      <View style={{height: '100%', alignItems: 'center', marginTop: '2%', flex:1}}>

        <View >
            <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular}}>First Name</Text>
            <TextInput
            
              value={firstname}
              onBlur={() => {
                firstname ? firstNameValidiation() : null;
              }}
              onChangeText={text => {
                setfirstname(text);
                if (text.length ===0){
                  setValidFirstName(false)
                }
              }}
              style={{
                width: width - 60,
                height:45,
                
                color:  'gray',
                // fontWeight: 'Regular',
                fontFamily: fontFamily.Regular,
                borderColor: validFirstName ? 'red':'#DDDDDD',
                // Set border width.
                borderWidth: 1,
                marginTop:10,
                padding: 10,

              }}
            />

          {
            firstname == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'First Name is required'}</Text> : null
          }

          </View>
         


      <View>
          <Text style={{fontWeight:'600', fontSize: moderateScale(12), fontFamily: fontFamily.Regular, marginTop:15}}>Last Name</Text>
              <TextInput
                label="Last Name"
                value={lastname}
                onChangeText={text => {
                  setlastname(text);
                  if (text.length ===0){
                    setValidLastName(false)
                  }
                }}
                onBlur={() => { lastname ? lastNameValidiation() : null; }}
                onFocus={() => { firstNameValidiation(); }}
                style={{
                  borderWidth: 1,
                  width: width - 60,
                  height:45,
                  color: 'gray',
                  borderColor: validFirstName ? 'red':'#DDDDDD',
                  // fontWeight: 'Regular',
                  fontFamily: fontFamily.Regular,
                  marginTop:10,
                  padding: 10,


                }}
              />


          {
            lastname == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Last Name is required'}</Text> : null
          }
        </View>



         <View >
            <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular, marginTop:15}}>Email Address</Text>
                <TextInput
                  value={email}
                  autoCapitalize='none'
                  onChangeText={text => {
                    setEmail(text);
                    if (text.length === 0) {
                      setValidEmail(false)
                    }
                  }}
                  onFocus={() => { lastname ? lastNameValidiation() : null; }}
                  onBlur={() => { email ? emailValidiation() : null; }}
                  style={{
                    borderWidth: 1,
                    width: width - 60,
                    height:45,
                    color:  'gray',
                    // fontWeight: 'Regular',
                    fontFamily: fontFamily.Regular,
                    borderColor: validEmail ? 'red':'#DDDDDD',
                    marginTop:10,
                    padding: 10,


                  }}
                />

          {
            email == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Email address is required'}</Text> : null
          }
          {
            validEmail ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Please enter a valid email address'}</Text> : null
          }

        </View>
          {/* {
            validEmail ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular}}>{Validations.validEmail}</Text> : null
          } */}




    <View style={styles.subcontainer}>

        <View style={{width: '32%', alignContent:'center', alignItems:'center', alignSelf:'center'}}>
        <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular, marginLeft:10, marginBottom:10}}>Country code</Text>
        <View style={{width:'65%',
                flexDirection:'row',
                borderWidth:1,
                borderColor:'#DDDDDD',
                alignItems:'center',
                height:45,
                marginLeft:20,
                textAlign:'center',
                justifyContent:'center',
                // borderRadius:5,
                marginRight: moderateScale(6)}}>
                <View style={{width: 35}}>
                  <CountryPicker
                  {...{
                    onSelect,
                  }}
                    withFilter
                    withCallingCode
                    countryCode={country.cca2}
                    theme={DEFAULT_THEME}
                  />
                </View>
                <Text style={{ color: 'gray',
                  fontFamily: fontFamily.regular,
                  fontSize: moderateScale(13),
                  marginTop:5,
                  textAlign: 'left',}}>
                  {'+'+ country.callingCode[0]}
                </Text>
              </View>
            {/* <Image source={require('./../Assets/images/mdrxlogo_light.png')} style={{height: scale(60),width:scale(60)}}/> */}
        </View>
        <View style={{width: '68%'}}>
        <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular, marginBottom:10}}>Mobile Number</Text>    
                <TextInput
                  onChangeText={text => {
                      setMobile(text);
                      if (text.length === 0) {
                        setValidMobile(false);
                      }
                  }}
                  maxLength={14}
                  value={mobile}
                    onBlur={() => {
                      mobile ? mobileValidiation() : null;
                    }}
                    keyboardType={'number-pad'}
                
                  style={{
                    borderWidth:1,
                    width: width - width * 0.39,
                    height:45,
                    color:  'gray',
                    // fontWeight: 'Regular',
                    fontFamily: fontFamily.Regular,
                    borderColor: validMobile ? 'red':'#DDDDDD',
                    padding: 10,

                    // marginTop:10

                  }}
                />

                
        {
          mobile == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Mobile number is required'}</Text> : null
        }

        {
        validMobile ? <Text style={{fontFamily:fontFamily.Regular, fontSize:11, color:'red', position:'absolute', left:0, bottom:-15}}>{'Please pick the 10 digit mobile number'}</Text> : null
        }
        </View>


      </View>


      


       <View style={{ flexDirection: 'row',justifyContent: 'flex-start',}}>
          <View>
          <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular, marginTop:15}}>
            Setup 4 Digit PIN
            </Text> 
            <TextInput
              //placeholder="Setup 4 Digit PIN"
              keyboardType={'number-pad'}
              value={pin}
              secureTextEntry={true}
              maxLength={4}
              onChangeText={text => {
                setPin(text);
                ShowMaxAlert(text)
                if(text.length > 4) {
                  alert('Only 4 Digit pin accepted')
                  setvalidatepin(true)
                }
                else{
                  setvalidatepin(false)
                }
              }}
              style={{
                borderWidth: 1,
                width: width-60,
                height:45,
                //borderBottomColor: validatepin ? 'red': null,
                fontFamily: fontFamily.Regular,
                color:validatepin ? 'red': 'gray',
                marginTop:10,
                borderColor: '#DDDDDD',
                padding: 10,



              }}
            />


        {
          pin.length <=3 && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Enter 4 digit PIN'}</Text> : null
        }
            </View>
        </View> 


        <View>
          <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Regular, marginTop:15}}>Confirm Your PIN</Text>   
          <TextInput
            value={confirmPin}
            keyboardType={'number-pad'}
            secureTextEntry={true}
            maxLength={4}
            onChangeText={text => {
              setConfirmPin(text);
              ShowMaxAlert(text)
              if (text.length > 4) {
                alert('Only 4 Digit pin accepted')
                setvalidateconfirmpin(true)
              }
              else{
                setvalidateconfirmpin(false)
              }
            }}
            style={{
              borderWidth: 1,
              width: width-60,
              height:45,
              borderBottomColor: validateconfirmpin ? 'red': null,
              fontFamily: fontFamily.Regular,
              color:validateconfirmpin ? 'red': 'gray',
              marginTop:10,
              borderColor:'#dddddd',
              padding: 10,



            }}
          />

          {
           confirmPin == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15, right:20}}>{'Enter 4 digit PIN'}</Text> : null
          }


          {
            confirmPin && pin != confirmPin && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-26, right:20}}>{'PIN does not match with Confirm PIN. Please make sure your PIN matches'}</Text> : null
          }
        </View>


        <View style={{flexDirection:'row', alignItems:'center', top: width * 0.07, marginHorizontal:30}}>

          <View style={{zIndex:9999999}}>

            <CheckBox
                style={{ padding: 5}}
                onClick={()=>{
                  setToggleCheckBox(toggleCheckBox == true  ? false : true)
                  // this.setState({
                  //     isChecked:!this.state.isChecked
                  // })
                }}
                isChecked={toggleCheckBox}
                leftText={""}
            />
          </View>


              <Text style={{fontFamily:fontFamily.Regular ,fontSize: moderateScale(14),color:'black'}}>Agree MdRx <Text style={{color: '#0EA1D8'}}
                onPress={() => Linking.openURL('https://mdrxonline.com/terms-n-conditions/')}>Terms of Service</Text>  and <Text style={{color: '#0EA1D8'}} onPress={() => Linking.openURL('https://mdrxonline.com/privacy-policy/')}>Privacy Policy</Text> </Text>
          </View>
        
        </View>


      <View
        style={{
          height: height * 0.11,
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop:100,
          // paddingBottom:'40%',
          // padding:20,
          margin:10,
          width: '96%',
          marginTop:15


        }}>
        <TouchableOpacity
          onPress={
            () => signUpCheck()
            // navigation.navigate('Home')
          }>
          <View
            style={{
              // height: width * 0.5,
              // padding:10,
              width:width * 0.91,

              // width: '100%',
              // backgroundColor: '#0EA1D8',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor:'#0EA1D8'
              // marginTop:2,
            }}>
              {/* <LinearGradient  
                    start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                    locations={[0,0,1]}
                    colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                    style={styles.linearGradient}> */}
                    <Text style={styles.buttonText}>
                    Next
                    </Text>
                  {/* </LinearGradient> */}
            {/* <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Bold}}>
              Next
            </Text> */}
          </View>
        </TouchableOpacity>


      </View>



      <View style={{flexDirection:'row', height: height * 0.2,alignSelf:'center'}}>
        <Text style={{marginRight:10, fontFamily: fontFamily.Regular, fontSize: moderateScale(15), textAlign:"center"}}>
           {'Already have an account ?'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ExistingUser')}>
          <Text style={{fontFamily: fontFamily.Regular, color:'#0EA1D8', fontSize: moderateScale(15), textAlign:"center"}}>
            {'Login'}
          </Text>
        </TouchableOpacity>
       </View>



       <Modal isVisible={isModalVisible}>
          <View style={{ alignItems:'center', justifyContent:'flex-end', alignSelf:'center',backgroundColor:'#fff', padding:20}}>
          {/* <TouchableOpacity onPress={toggleModal} style={{ position:'absolute', right:0, top:0}}>
            <Image source={require('../Assets/close.png')}  style={{height: scale(20), width: scale(20)}} />
            </TouchableOpacity> */}
            <Text style={{fontFamily: fontFamily.Regular}}>{'Please accept our Terms and Conditions and Privacy Policy to move forward.'}</Text>

            <View style={{justifyContent:'flex-end', alignSelf:'flex-end', alignItems:'flex-end'}}>

              <Button title="Ok" onPress={toggleModal}/>
            </View>
          </View>
        </Modal>

    

    </KeyboardAwareScrollView>
    </ScrollView>

    {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff'
  },

  subcontainer: {
    // backgroundColor:'#2e99c2',
    justifyContent:'center',
    alignItems:"center", 
   marginTop:15,
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

