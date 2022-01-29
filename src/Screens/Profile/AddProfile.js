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
  SafeAreaView,
  Platform
} from 'react-native';
// import Styles from '../../Components/Styles';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../../Utils/AuthContext';
import {fontFamily} from '../../Utils/fonts';

const {height, width} = Dimensions.get('window');
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { moderateScale, scale } from 'react-native-size-matters';

import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';
import KeyboardAwareScrollView from '../../Components/KeyboardAwareScrollView';


import moment from 'moment';
import {ProfileContext} from '../../Utils/ProfileContext';
export default function AddProfile ({
  navigation,
  route,
  getProfileMsgRead,
  getProfile,
  profileSuccess,
  profileFailed,
  profileData,
  editProfileMsgRead,
  editProfile,
  editFail,
  editSuccess,
  GetProfileList
}) {

  const {setUser, user, token} = useContext(AuthContext);

  console.log('profileData page++++', profileData);
  const [firstname, setfirstname] = useState('');
  const {profile} = useContext(ProfileContext);

  console.log('profile+++++++=', profile);

  const [dob, setdob] = useState('');

  const [send, sendDate] = useState('');


  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [record, setRecord] = useState('');
  // const [country, setcountry] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setname] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [validMobile, setValidMobile] = useState(false);


  const reg = /^[0]?[789]\d{9}$/;

  const [country, setPicker] = useState({
    callingCode:  profileData && profileData[0] && profileData[0].profile_country ? [profileData[0].profile_country] : ['44'],
    cca2: 'GB',
    currency: ['GBP'],
    flag: 'flag-us',
    name: 'United Kingdom',
    region: 'Europe',
    subregion: 'Northern Ireland'
  });

  const showDatePicker = () => {
    console.log('------- worling --------')
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date1 => {
    console.log('Beforedate', date1);
    var ds = date1.toString();
    // var NewDate = moment(new Date(ds.substr(0, 16)));
    const NewDate = moment(ds).format('Do MMM, YYYY');
    const SendDate = moment(ds).format('YYYY-MM-DD');


    // console.warn('A date has been picked: ', NewDate);
    // console.log('54874=========>' + NewDate.format('DD/MM/YYYY'));
    setDate(NewDate);
    setdob(NewDate);
    sendDate(SendDate)
    hideDatePicker();
  };

    useEffect(() => {
      getProfile();
    }, []);


    useEffect(() => {
      sendDate(profileData && profileData[0] && profileData[0].dob ?  moment(profileData[0].dob).format('YYYY-MM-DD') : '')
      setDate(profileData && profileData[0] && profileData[0].dob ?  moment(profileData[0].dob).format('Do MMM, YYYY') : '')
      setdob(profileData && profileData[0] ?  profileData[0].dob : '')
      setMobile(profileData && profileData[0] ?  profileData[0].profile_phone_number : '')
      setRecord(profileData && profileData[0] ?  profileData[0].profile_code : '')
      setfname(profileData && profileData[0] ?  profileData[0].profile_fname : '')
      setlname(profileData && profileData[0] ?  profileData[0].profile_lname : '')

    }, [profileData]);


    

  //   useEffect(() => {

  //     if (profileSuccess) {
  //       console.log('ProfileData', profileData)
  //       setname(profileData.profile_name)
  //       setfname(profileData.profile_fname)
  //       setlname(profileData.profile_lname)
  //       setMobile(profileData.profile_phone_number)
  //       setdob(profileData.dob)
  //       setcountry(profileData.profile_country)
  //       // setRecord(profileData.)
  //       Toast.show('get Profile Succesfully', Toast.SHORT, [
  //         'UIAlertController',
  //       ]);
  //       getProfileMsgRead();
  //     } else if (profileFailed) {
  //       Toast.show(
  //         'profile  Failed, please try again.',
  //         Toast.SHORT,
  //         ['UIAlertController'],
  //       );

  //       getProfileMsgRead();
  //     }
  //     return () => { };
  //   });


    /********* Select Country ********/
    const onSelect = country => {
      setPicker(country)
    };

  const signUpCheck = () => {
    setSubmit(true)
    if (fname == '') {
      // Alert.alert('First Name is required');
      return false;
    } else if (lname == '') {
      // Alert.alert('Last Name is required');
      return false;
    } else if (mobile == '') {
      // Alert.alert('Mobile number is required');

      return false;
    } else if (isNaN(mobile)) {
      // Alert.alert('Please enter a valid phone number');
      return false;
    } else if (mobile.length <= 9) {
      // Alert.alert('Please pick the 10 digit mobile number');
      return false;
    }

    console.log('editProfile++++', editProfile);
    const paramsData = {
      id: user.id,
      dob: send,
      profile_fname: fname,
      profile_lname: lname,
      useraccount_country: country.callingCode[0],
      profile_phone_number: mobile,
      profile_code: record,
      relationship:'self'
    }

    console.log('paramsData+++++', paramsData)


    const userData = {
      email: email,
      fname: fname,
      lname: lname,
      id: user.id,
      phone_number: mobile,
      pro_member: true
    }

    setUser(userData);
    editProfile(profile[0].mdrx_id, paramsData);
  };
  useEffect(() => {
    if (editSuccess) {
      console.log('profile[0].id++++++++', profile[0].mdrx_id)
      getProfile(profile[0].mdrx_id);
      Toast.show('Profile Updated Successfully', Toast.SHORT, [
        'UIAlertController',
      ]);
      editProfileMsgRead();
    } else if (editFail) {
      Toast.show('Profile cannot be updated due to some issue. Please try again.', Toast.SHORT, [
        'UIAlertController',
      ]);
      editProfileMsgRead();
    }
    return () => {};
  });


  const mobileValidiation = () => {
    if (mobile.length >=10) {
      setValidMobile(false)
    } 
      else {
        setValidMobile(true);
      }
    }


  return (
    <SafeAreaView  style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      
        <View  style={{
            width: width,
            height: height * 0.06,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:'#FFF',
            marginTop: Platform.OS === 'android' ? '8%' : 0,

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
              <View>
                 <Image
                    source={require('../../Assets/dummy.png')}
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </View>
              <Text style={{fontSize: moderateScale(16), marginHorizontal: 20,mfontFamily:fontFamily.Bold , color:'#000',}}>
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

        <KeyboardAwareScrollView  style={{ marginBottom: 0 }}
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
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>First Name</Text>
           <TextInput
                placeholder={''}
                value={fname}
                onChangeText={text => {
                  setfname(text);
                }}
                style={{
                  // flex:0.9,
                  backgroundColor:'#FFF',
                  // borderBottomColor: '#FFFFFF',
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
              fname == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-14}}>{'First Name is required'}</Text> : null
            }
           </View>


           <View style={{ paddingTop:width *0.03}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>Last name</Text>
           <TextInput
                placeholder={''}
                value={lname}
                onChangeText={text => {
                  setlname(text);
                }}
                style={{
                  // flex:0.9,
                  backgroundColor:'#FFF',
                  // borderBottomColor: '#FFFFFF',
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
              lname == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-14}}>{'Last Name is required'}</Text> : null
            }
           </View>
       
            <View style={{ paddingTop:width *0.03 }}>
              <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>Date of Birth</Text>
                <TouchableOpacity
                    style={{
                      // flex:0.9,
                      // margin: 10,
                      // flexDirection: 'row',
                      borderColor:'#d3d3d3',
                      borderWidth:0.5,
                      height:width *0.11,
                      width:width *0.85,
                      alignItem:'start',
                    justifyContent:'center',
                    backgroundColor:'#fff'
                    }} onPress={showDatePicker}>
                    {/* <TouchableOpacity> */}

                    <Image
                      source={require('../../Assets/calendar.png')}
                      style={{height: scale(25), width: scale(25), position: 'absolute',zIndex:1,right:4}}
                    />
                    
                    {/* </TouchableOpacity> */}

                    <Text style ={{alignSelf: 'flex-start',fontFamily:fontFamily.Regular, padding: 10, color: '#3598f7',  fontSize: moderateScale(15)}}>{date}</Text>
                    
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        value={date}
                        display="spinner"
                        format="YYYY-MM-DD"
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        onDateChange={date => {
                          setDate(date);
                        }}
                      />
                    </TouchableOpacity>
            </View>


          <View style={{justifyContent:'flex-start', alignItems:'flex-start',  marginTop:10,  flexDirection: 'row',  width:'100%'}}>
            <View style={{width: '32%', alignContent:'flex-start', alignItems:'flex-start', alignSelf:'flex-start'}}>
               <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Bold,  marginBottom:10, color:'gray'}}>Country code</Text>
              <View style={{width:'80%',
                      flexDirection:'row',
                      borderWidth:1,
                      borderColor:'#d3d3d3',
                      alignItems:'center',
                      backgroundColor:'#fff',
                      height:width *0.11,
                      // marginLeft:20,
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
                      <Text style={{ color: '#3598f7',
                        fontFamily: fontFamily.Regular,
                        fontSize: moderateScale(13),
                        marginTop:5,
                        textAlign: 'left',}}>
                        {'+'+ country.callingCode[0]}
                      </Text>
                    </View>
            {/* <Image source={require('./../Assets/images/mdrxlogo_light.png')} style={{height: scale(60),width:scale(60)}}/> */}
          </View>
          <View style={{width: '68%',alignContent:'flex-start', alignItems:'flex-start', alignSelf:'flex-start'}}>
          <Text style={{fontWeight:'600', fontSize:moderateScale(12), fontFamily: fontFamily.Bold, marginBottom:10, color:'gray'}}>Mobile Number</Text>    
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
                      width: '100%',
                      height:width *0.11,
                      color: '#3598f7',
                      fontSize: moderateScale(15),
                    fontFamily:fontFamily.Regular,
                      // fontWeight: 'Regular',
                      borderColor: '#d3d3d3',
                      backgroundColor:'#fff',

                      padding: 10,

                      // marginTop:10

                    }}
                  />

            {
              mobile == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:0, bottom:-15}}>{'Mobile number is required'}</Text> : null
            }

            {
            mobile && mobile.length <= 9 ? <Text style={{fontFamily:fontFamily.Regular, fontSize:moderateScale(11), color:'red', position:'absolute', left:0, bottom:-15}}>{'Please pick the 10 digit mobile number'}</Text> : null
            }
          </View>
        </View>


        <View style={{ paddingTop:width *0.03}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>Email Address</Text>
           <TextInput
                placeholder={''}
                value={email}
                editable={false}
                onChangeText={text => {
                  setEmail(text);
                }}
                style={{
                   // flex:0.9,
                   backgroundColor:'#FFF',
                   // borderBottomColor: '#FFFFFF',
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
           </View>


           <View style={{ paddingTop:width *0.02}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:'gray'}}>Medical Record Number</Text>
           <TextInput
                placeholder={''}
                value={record}
                onChangeText={text => {
                  setRecord(text);
                }}
                style={{
                  // flex:0.9,
                  // flex:0.9,
                  backgroundColor:'#FFF',
                  // borderBottomColor: '#FFFFFF',
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
           </View>

        <TouchableOpacity
          onPress={
            () => signUpCheck()
            // navigation.navigate('Home')
          }
          style={{top:20, alignContent:'center', alignItems:'center', alignSelf:'center', width:'100%'}}>
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

