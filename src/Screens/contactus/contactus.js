import React, {useState, useContext, useEffect} from 'react';
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
  SafeAreaView
} from 'react-native';
// import Styles from '../../Components/Styles';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../../Utils/AuthContext';
import {fontFamily} from '../../Utils/fonts';

const {height, width} = Dimensions.get('window');
import { moderateScale, scale } from 'react-native-size-matters';
import {Regex} from '../../Utils/Constant';
import KeyboardAwareScrollView from '../../Components/KeyboardAwareScrollView';



import moment from 'moment';
import {ProfileContext} from '../../Utils/ProfileContext';
export default function ContactUs ({
  navigation,
  saveContactus,
  getProfile,
  editProfileMsgRead,
  editFail,
  editSuccess,
  contactus,
  conactUsMsgRead
}) {


  console.log('conactUsMsgRead++++++', conactUsMsgRead);
  console.log('contactus+++++++',contactus)
  const {setUser, user, token} = useContext(AuthContext);
  const {profile} = useContext(ProfileContext);



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const [validEmail, setValidEmail] = useState(false);



  useEffect(() => {
    if (contactus) {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      conactUsMsgRead()
      Toast.show("Thanks for contact with us. we'll touch with you soon.", Toast.SHORT, [
        'UIAlertController',
      ]);
      navigation.navigate('Dashboard');

    }
  });

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


  const signUpCheck = () => {
    setSubmit(true)
    if(name == ''){
      return false;

      // Toast.show('Please enter name.', Toast.SHORT, [
      //   'UIAlertController',
      // ]);

    }else if(email == ''){
      return false;

      // Toast.show('Please enter registered email address.', Toast.SHORT, [
      //   'UIAlertController',
      // ]);

    }else if (!Regex.EMAIL_REGX.test(email)) {
      return false;

      // Toast.show('Please enter a valid email address', Toast.SHORT, [
      //   'UIAlertController',
      // ]);

    }else if(phone == ''){
      return false;

      // Toast.show('Please enter a valid phone number', Toast.SHORT, [
      //   'UIAlertController',
      // ]);

    } else if (isNaN(phone)) {
      // Alert.alert('Please enter a valid phone number');
      return false;
    } else if (phone.length <= 9) {
      // Alert.alert('Please pick the 10 digit mobile number');
      return false;
    }else if(message == ''){
      return false;

      // Toast.show('Please enter message', Toast.SHORT, [
      //   'UIAlertController',
      // ]);

    }else{

      const paramsData = {
        name: name,
        email: email,
        phone: phone,
        message: message

      }

      saveContactus(paramsData)
      

    }

  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

     <View  style={{
            width: width,
            height: height * 0.06,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:'#FFF',
            // marginTop:'8%',
            paddingBottom:20,
            borderBottomWidth: 1,
            borderBottomColor: '#D0D0D0',
          }}>
            <TouchableOpacity  style ={{ left:10, height:25,width:20}} onPress={() => navigation.goBack(null)}>
              <Image source={require('../../Assets/back.png')}  style={{height: scale(20), width: scale(20)}} />
            </TouchableOpacity>
          
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                // marginLeft: '30%',
              }}>
              <TouchableOpacity   onPress={() => navigation.navigate('AddProfile')}>
                 <Image
                    source={require('../../Assets/dummy.png')}
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </TouchableOpacity>
              <Text style={{fontSize: moderateScale(16), marginHorizontal: 20, fontFamily:fontFamily.Bold , color:'#000',}}>
                {user.fname} {user.lname}
              </Text>
           
              <View style={{marginLeft: '5%'}}>
              </View>
            </View>

            <View
              style={{
                marginRight: '1%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <View style={{marginRight: 10}}>
                <Image
                    source={require('../../Assets/menu.png')}
                    style={{height: scale(30), width: scale(25)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
        </View>

        
<KeyboardAwareScrollView  style={{ flex: 1, marginBottom: 0 }}
          keyboardShouldPersistTaps={'always'}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          bounces={true}
          showsVerticalScrollIndicator={false}>

      <View
        style={{  
          padding: 20,margin:10,
            justifyContent:'center'}}>


        <View style={{}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>Name</Text>
           <TextInput
                placeholder={''}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                style={{
                  // flex:0.9,
                  backgroundColor:'#fff',
                  borderWidth: 0.5,
                  borderColor:'#d3d3d3',
                  fontSize: moderateScale(15),
                  fontFamily:fontFamily.Regular,
                  // color: '#666666',
                  // width:width *0.85,
                  height:width *0.11,
                  padding: 10,
                  color: '#3598f7',

                }}
              />

          {
            name == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-12}}>{'Name is required'}</Text> : null
          }
           </View>



           <View style={{}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray', marginTop:15}}>Email</Text>
           <TextInput
                placeholder={''}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}

                onBlur={() => { email ? emailValidiation() : null; }}

                style={{
                  // flex:0.9,
                  backgroundColor:'#fff',
                  borderColor:'#d3d3d3',
                  borderWidth:0.5,
                  fontSize: moderateScale(15),
                  fontFamily:fontFamily.Regular,
                  // color: '#666666',
                  // width:width *0.85,
                  height:width *0.11,
                  padding: 10,
                  color: '#3598f7',

                }}
              />

          { 
            email == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-12}}>{'Email address is required'}</Text> : null
          }
          {
            validEmail ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-12}}>{'Please enter a valid email address'}</Text> : null
          }
           </View>


           <View style={{}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray', marginTop:15}}>Phone Number</Text>
           <TextInput
                placeholder={''}
                value={phone}
                keyboardType={"numeric"}
                onChangeText={text => {
                  setPhone(text);
                }}
                style={{
                  // flex:0.9,
                  backgroundColor:'#fff',
                  borderWidth: 0.5,
                  borderColor:'#d3d3d3',
                  fontSize: moderateScale(15),
                  fontFamily:fontFamily.Regular,
                  // color: '#666666',
                  // width:width *0.85,
                  height:width *0.11,
                  padding: 10,
                  color: '#3598f7',

                }}
              />


          {
            phone == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-12}}>{'Mobile number is required'}</Text> : null
          }

          {
           phone && phone.length <= 9 ? <Text style={{fontFamily:fontFamily.Regular, fontSize:moderateScale(11), color:'red', position:'absolute', left:0, bottom:-12}}>{'Please pick the 10 digit mobile number'}</Text> : null
          }
           </View>


           <View style={{}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, marginTop:15,  color:'gray'}}>Message</Text>
           <TextInput
                multiline
                numberOfLines={4}
                placeholder={''}
                value={message}
                onChangeText={text => {
                  setMessage(text);
                }}
                style={{
                  // flex:0.9,
                  backgroundColor:'#fff',
                  borderWidth: 0.5,
                  borderColor:'#d3d3d3',
                  fontSize: moderateScale(15),
                  fontFamily:fontFamily.Regular,
                  // color: '#666666',
                  // width:width *0.85,
                  height:width *0.50,
                  padding: 10,
                  color: '#3598f7',

                }}
              />

            {
              message == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-12}}>{'Message is required'}</Text> : null
            }
           </View>

       
        <TouchableOpacity
          onPress={
            () => signUpCheck()
            // navigation.navigate('Home')
          }
          style={{ alignContent:'center', alignItems:'center', alignSelf:'center', width:'100%', marginTop:30}}>
          <View
            style={{
              height: 47,
              width:'100%',
              // width: 143,
              backgroundColor: '#0EA1D8',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              // elevation:4,
              // bottom :20,
              // shadowColor:'#F0F4F5'
            }}>
            <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Bold, fontSize: moderateScale(16)}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

