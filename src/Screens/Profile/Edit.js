import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,Alert, useColorScheme, SafeAreaView, Platform
} from 'react-native';
// import Styles from '../../Components/Styles';
import {Regex} from '../../Utils/Constant';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {registerAction} from '../../redux/actions/registerAction';
import {AuthContext} from '../../Utils/AuthContext';
import { fontFamily } from '../../Utils/fonts';


const {height, width} = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';
import Material from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from "react-native-dropdown-picker";
import moment from 'moment';
import { ProfileContext } from '../../Utils/ProfileContext';
import { APP_BASE_URL } from '../../Utils/apiConfig';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedInput from "react-native-animated-input";
const Register = ({
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
}) => {
  const {user, token} = useContext(AuthContext);
  const [firstname, setfirstname] = useState('');
  const {profile} = useContext(ProfileContext);
  const [dob, setdob] = useState('');
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [record, setRecord] = useState('');
  const [country, setcountry] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setname] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [getCountryLists, setCountryLists] = useState([]);
  const [value, setValue] = useState('');
  const reg = /^[0]?[789]\d{9}$/;
  const controller = useRef(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date1 => {
    console.log('Beforedate', date1);
    var ds = date1.toString();
    // var NewDate = moment(new Date(ds.substr(0, 16)));
    const NewDate = moment(ds).format('YYYY-MM-DD');
    // console.warn('A date has been picked: ', NewDate);
    // console.log('54874=========>' + NewDate.format('DD/MM/YYYY'));
    setDate(NewDate);
    setdob(NewDate)
    hideDatePicker();
  };

  useEffect(() => {
    console.warn('Profile',profile[0].mdrx_id)
    getProfile(profile[0].mdrx_id);
    return () => {};
  }, []);

  useEffect(() => {

    if (profileSuccess) {
      console.log('ProfileData', profileData)
      console.warn(profileData.profile_country)
      setname(profileData.relationship)
      setfname(profileData.profile_fname)
      setlname(profileData.profile_lname)
      setMobile(profileData.profile_phone_number)
      setdob(profileData.dob)
      setcountry(profileData.profile_country)
      setValue(profileData.profile_country)
      setRecord(profileData.profile_code)
      // Toast.show('get Profile Succesfully', Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      getProfileMsgRead();
    } else if (profileFailed) {
      Toast.show(
        'profile  Failed, please try again.',
        Toast.SHORT,
        ['UIAlertController'],
      );
  
      getProfileMsgRead();
    }
    return () => { };
  });

  const mobileValidiation = () => {
    if (mobile.length >=10) {
      setValidMobile(false)
    } 
      else {
        setValidMobile(true);
      }
    }
  
    const signUpCheck = () => {
      if (
      
            fname=== '' &&
            lname === '' &&
            mobile === '' &&
            email === '' &&
            value === ''
          ) {
            Alert.alert('Please complete all required fields to move forward');
            return false;
          } else if (fname == '') {
            Alert.alert('First Name is required');
            return false;
          } else if (lname == '') {
            Alert.alert('Last Name is required');
            return false;
          } else if (mobile == '') {
            Alert.alert('Mobile number is required');
      
            return false;
          } else if (isNaN(mobile)) {
            Alert.alert('Valid Phone Number is required');
            return false;
          } else if (mobile.length <= 9) {
            Alert.alert('Please enter the 10 digit mobile number');
            return false;
          }
          else if (email == '') {
          Alert.alert('Email addredd is required');
            return false;
          } else if (!Regex.EMAIL_REGX.test(email)) {
            Alert.alert('Please enter a valid email address');
      
            return false;
          } 
         else if (value === '') {
            Alert.alert('Please select a country code');
      
            return false;
          }
         
          var form = new FormData();
          form.append('profile_fname', fname);
          form.append('profile_lname', lname);
          form.append('email', email);
          form.append('profile_phone_number', mobile);
          form.append('dob', dob)
          form.append('profile_country1', value);
          form.append('profile_country' ,value)
          form.append('profile_code', record)
          form.append('relationship', 'self')
          editProfile(profile[0].mdrx_id, form)
      
        };



  // const signUpCheck = () => {
  //   editProfile(profile[0].id, dob, name, fname, lname, country,value, mobile);
  // };



  useFocusEffect(
    React.useCallback(() => {
      getProfile(profile[0].mdrx_id);
     
    }, [])
  );
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(APP_BASE_URL+"api/auth/list-country");
      res
        .json()
        .then(res => setCountryLists(res))
        .catch(err => setErrors(err));
    }
  
    fetchData();
  
  });
  useEffect(() => {

    if (editSuccess) {
      getProfile(profile[0].mdrx_id);
      // Toast.show('Profile Updated Succesfully', Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      editProfileMsgRead();
    } else if (editFail) {
      Toast.show(
        'Profile cannot be updated due to some issue. Please try again.',
        Toast.SHORT,
        ['UIAlertController'],
      );
      editProfileMsgRead();
    }
    return () => { };
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} contentContainerStyle={{flex:1}}>
     <View  style={{
            width: width,
            height: height * 0.05,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:'#FFF',
            marginTop: Platform.OS === 'android' ? '12%' : 0,

            // marginTop:'12%',
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
                    style={{height: 30, width: 30, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </View>
              <Text style={{bottom: '14%', fontSize: moderateScale(16), paddingLeft: 20, top: 0, fontFamily:fontFamily.Bold , color:'#000',}}>
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

      <ScrollView>

       
      <View
        style={{ alignItems: 'center', marginTop: '4%', padding:5, margin:5}}>
             <TextInput
          placeholder="Relationship"
          value={name}
          onChangeText={text => {
            setname(text);
          }}
          // editable={false}
          style={{
            
            borderBottomWidth:0.2,
            width: width - 60,
            // fontWeight: 'Regular',
            fontFamily:fontFamily.Regular,
            fontSize:14
          }}
        />
             {/* <TextInput
          placeholder="first name"
          value={fname}
          onChangeText={text => {
            setfname(text);
          }}
          styleLabel={{   fontFamily:fontFamily.Regular, fontWeight: "600" }}
          styleBodyContent={{    borderBottomWidth:0.2,
            width: width - 60,
        color:'black',
            fontFamily:fontFamily.Regular,
            fontSize:14,
borderBottomWidth: 1.5 }}
          // style={{
          //   borderBottomWidth:0.2,
          //   width: width - 60,
        
          //   fontFamily:fontFamily.Regular,
          //   fontSize:14

          // }}
        /> */}
             <TextInput
          placeholder="Last name"
          value={lname}
          onChangeText={text => {
            setlname(text);
          }}
        
          style={{
            borderBottomWidth:0.2,
            width: width - 60,
            // fontWeight: 'Regular',
            fontFamily:fontFamily.Regular,
            fontSize:14

          }}
        />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          editable={false}
          style={{
            borderBottomWidth:0.2,
            width: width - 60,
                      fontSize:14,

            fontFamily:fontFamily.Regular
          }}
        />
         <View style={{flexDirection:'row'}}>
      
               <Dropdown
        label='Country Code'
        useNativeDriver={true}
      data={getCountryLists.map(item=> ({label:item.country_phone_code,value:item.id}))}
      selectedItem={selectedItem =>
        setValue(selectedItem)
       
    }
        // data={getCountryLists}
        value={value}
        inputContainerStyle={{
          // borderColor: colors.ButtonDark,
          top: 10,
          //   marginStart: '10%',
      }}
            containerStyle={{fontFamily:fontFamily.Regular,width:width * 0.2, bottom:10}}
      />
      <View style={{top:'3.1%'}}>
      <TextInput
          placeholder="Mobile Number"
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
            borderBottomWidth: 0.2,
            width: width - width * 0.4,
            color: validMobile ? 'red': 'black',
            // fontWeight: 'Regular',
            fontFamily: fontFamily.Regular,
            borderBottomColor: validMobile ? 'red':'black',
            // bottom:8,

          }}
        />
      </View>
     
         
        </View>
      
        {validMobile ? <Text style={{fontFamily:fontFamily.Light, fontSize:11, color:'red'}}>{Validations.validMobile}</Text> : null}
        {/* <TextInput
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={text => {
            setMobile(text);
          }}
          style={{
            borderBottomWidth:0.2,
            width: width - 60,
            fontSize:14,

            fontFamily:fontFamily.Regular
          }}
        /> */}
       <View style={{flexDirection:'row'}}>
       <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  value={date}
                  // isDarkModeEnabled={useColorScheme=== 'dark'}
                  display="spinner"
            maxDate={moment().format('YYYY-MM-DD')}
                  format="YYYY-MM-DD"
                  // date={new Date()}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  onDateChange={d => {
                    setDate(d);
                  }}
                />
          <TouchableOpacity  style={{borderBottomWidth:0.2, left:'3%'}} onPress={() => showDatePicker()}>
       
         <MaterialCommunityIcons
                    name={'calendar'}
                    size={30}
                    style={{top:10}}
                  />
         </TouchableOpacity>
        
       <TextInput
          placeholder="Date Of Birth"
          value={dob}
          onChangeText={text => {
            setdob(text);
          }}
          style={{
            // left:10,
            borderBottomWidth:0.2,
            width: width - width * 0.25,
            fontFamily:fontFamily.Regular
          }}
        />
       </View>
      
        {/* <TextInput
          placeholder="Country"
          onChangeText={text => {
            setcountry(text);
          }}
          value={country}
          keyboardType={'email-address'}
          style={{
            borderBottomWidth:0.2,
            width: width - 60,
            fontFamily:fontFamily.Regular
          }}
        /> */}
        {/* {console.warn('hathyara',value)} */}
              <Dropdown
        label='Country'
        useNativeDriver={true}
      data={getCountryLists.map(item=> ({label:item.country_name,value:item.id}))}
        // data={getCountryLists}
        onChangeText={(option, e) => {
          setValue(option);
         
      }}
        value={value}
        inputContainerStyle={{
          // borderColor: colors.ButtonDark,
          top: 10,
          //   marginStart: '10%',
      }}
            containerStyle={{fontFamily:fontFamily.Regular, width: width - 60,  bottom:10}}
      />
 {/* <View style={{ top:'1%'}}>
        <DropDownPicker
            items={getCountryLists.map(item=> ({label:item.country_name,value:item.id}))}
              
                placeholder={'Country code'}
                controller={instance => (controller.current = instance)}
                onChangeList={(items, callback) => {
                  Promise.resolve(setItems(items)).then(() => callback());
                }}
                defaultValue={value}
                onChangeItem={it => {setValue(it.value), console.warn(it.value)}}
       
    dropDownStyle={{backgroundColor: '#fafafa'}}
                // dropDownStyle={{backgroundColor: '#fafafa'}}
                // containerStyle={{fontFamily:fontFamily.Regular,width:width * 0.8}}
                labelStyle={{
                  fontSize: 15,
                  textAlign: 'left',
                  right:6,
                  color: '#666666',
                  fontFamily:fontFamily.SemiBold
              }}
                style={{
                  width:width * 0.4,
                  borderBottomColor:  '#AABEC6',
                  borderBottomWidth:0.6,
                  // flexDirection:'column',
                  borderWidth:0,
                  // fontSize: 15,
                  // zIndex:1,
                  backgroundColor:'#fff',
                fontFamily:fontFamily.Regular
                  // elevation:1
                }}

              />
      
         
        </View> */}
        <TextInput
          placeholder="Medical Record No"
          // keyboardType={'number-pad'}
          value={record}
          // secureTextEntry={true}
          onChangeText={text => {
            setRecord(text);
          }}
          style={{
            borderBottomWidth:0.5,
            width: width - 60,
            fontFamily:fontFamily.Regular
          }}
        />
      <TouchableOpacity
          onPress={
            () => signUpCheck()
            // navigation.navigate('Home')
          } style={{top:20}}>
          <View
            style={{
              height: 47,
              width: 143,
              backgroundColor: '#0EA1D8',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              // elevation:4,
              // bottom :20,
              // shadowColor:'#F0F4F5'
            

            }}>
            <Text style={{color: '#FFFFFF', fontFamily:fontFamily.Regular}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    
       
  </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
