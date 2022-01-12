import React, {
    Component,
    useContext,
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } from 'react';
  import {
    Dimensions,
    ImageBackground,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Button,
    StyleSheet,
    BackHandler,
    Alert,
    //   Button,
    Platform,
    TouchableWithoutFeedback,
    SafeAreaView
  } from 'react-native';
  import Styles from '../../Components/Styles';
  import {AuthContext} from '../../Utils/AuthContext';
  const {height, width} = Dimensions.get('window');
  import Toast from 'react-native-simple-toast';
  import DateTimePickerModal from 'react-native-modal-datetime-picker';
  import moment from 'moment';
  import {ShareRecordAction, typeAction} from '../../Service/RecordType';
  import { fontFamily } from '../../Utils/fonts';
  import { ProfileContext } from '../../Utils/ProfileContext';
  import { Regex } from '../../Utils/Constant';
  import { moderateScale, scale } from 'react-native-size-matters';
  // import LinearGradient from 'react-native-linear-gradient';


  export default function ShareRecord({ navigation, route,}) {
    const {profile} = useContext(ProfileContext);
    const {user, token} = useContext(AuthContext);
    const refRBSheet = useRef();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [filename, setfileName] = useState([]);
    const [date, setDate] = useState(profile[0].dob);
    const [name, setName] = useState('');
    const [imageRes, setimageRes] = useState('');
    const [email, setEmail] = useState('');
    const [data , setdata] = useState([]);
    const [pic , setPic]= useState([]);
    const[flag, setflag]=useState(false)
    const [validValidity, setvalidValidity] = useState(false);
    const [validdate, setValiddate] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const controller = useRef(null);
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const validation_date = () => {
        if (date) {
          if (date === '') {
            setValiddate(false);
          }
          else {
            setValiddate(true);
          }
        }
        else {
          // console.warn('inhere',FirstName)
    
          setValiddate(true);
        }
      };
    
      const ValidityValidiation = () => {
        if (value) {
      if (value === '') {
            setvalidValidity(false);
          }
          else {
            setvalidValidity(true);
          }
        }
        else {
          setvalidValidity(true);
        }
      };
      const emailValidiation = () => {
        if (email) {
          if (Regex.EMAIL_REGX.test(email)) {
            setValidEmail(true);
          }
          else {
            setValidEmail(false);
          }
        }
      };
    const handleConfirm = date1 => {
      console.log('Beforedate', date1);
      var ds = date1.toString();
      // var NewDate = moment(new Date(ds.substr(0, 16)));
      const NewDate = moment(ds).format('YYYY-MM-DD');
  
      // console.log('54874=========>' + NewDate.format('DD/MM/YYYY'));
      setDate(NewDate);
      hideDatePicker();
    };
  
    const showAlert1 = (item , i) => {
      Alert.alert(  
          'Share',  
          'Record has been shared successfully',  
          [  
              // {  
              //     text: 'Cancel',  
              //     onPress: () => console.log('Cancel Pressed'),  
              //     style: 'cancel',  
              // },  
              {text: 'Ok', onPress: () =>   navigation.navigate('Dashboard')},  
          ]  
      );  
  }  
  
  const onsubmit = () => { 
      if (email == '') {
        Alert.alert('Email address is required');
  
        return false;
      
      } else if (!Regex.EMAIL_REGX.test(email)) {
        Alert.alert('Please enter a valid email address');
  
        return false;
      }

      const parasdata = {
        shared_with: email,
        shared_record_list: route.params.shared_list.replace(/,\s*$/, "")
      }

      console.log('parasdata++++++', parasdata);
      // var form = new FormData();
      // form.append('duration', data);
      // form.append('dob', date);
      // form.append('shared_with', email);
      // form.append('shared_record_list', route.params.shared_list.replace(/,\s*$/, ""));
      // replace(/^"(.*)"$/, '$1')
      ShareRecordAction(parasdata).then(response => {
        // if (response.status=== 200) {
          // setUser(response.data);
          showAlert1()
        // } else {
        //   Toast.show('Record not shared', Toast.LONG);
        // }
      });
  };
   
    

    {
      return (
       
        <SafeAreaView style={{flex:1, backgroundColor:'#FFFFFF'}}>


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
              <TouchableOpacity onPress={() => navigation.navigate('AddProfile')}>
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
          <ScrollView>
          <View
                style={{
                 
                  marginTop: width * 0.07,
                  
                  
                }}>
                   <Text style={{alignSelf:'center', fontSize: moderateScale(18), fontFamily:fontFamily.Bold}}>Share Record</Text>
                
            
             </View> 
  
            <View
              style={{
                flex: 1,
                padding: 20,
                // margin:10,
                  justifyContent:'center',
              }}>

                {/* <View style={{flex:1}}>
                <Text style={{alignSelf:'center', fontSize: moderateScale(15), fontFamily:fontFamily.Regular}}>Duration of Record Access</Text>

                <View style ={{flexDirection:'column', borderColor:'gray',
                  backgroundColor:'#F7F6F6',}}>


                <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  placeholder={{ label: "Duration of access" }}

                    items={[
                        { label: 'One Hour', value: 1 },
                        { label: 'Three Hours', value: 2 },
                        { label: 'No Limit', value: 3 },
                    ]}
                />
      
                </View>
             
           
             
                </View> */}
             <View style={{flex:1, paddingTop:width *0.07}}>
             <Text style={{alignSelf:'center', fontSize: moderateScale(15), fontFamily:fontFamily.Regular}}>{ 'Enter email address of the person with whom you want to share medical records'} </Text>

             <TextInput
                  placeholder={'Share your medical records with others'}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (text.length === 0) {
                      setValidEmail(false)
                    }
                  }}
                  onFocus={() => { value ? emailValidiation() : null; }}
                  onBlur={() => { email ? emailValidiation() : null; }}
                  style={{
                    backgroundColor:'#F7F6F6',
                    borderBottomColor: '#FFFFFF',
                    borderBottomWidth:1,
                    fontSize: 15,
                    height:55,
                    fontFamily:fontFamily.SemiBold,
                    color: '#666666',
                    flex:1,
                    padding:10,
                    marginTop:20
                    // width:width *0.9,
                    // height:width *0.11
  
                  }}
                />
             </View>
             
              {/* </View> */}
  {/* <View style={{paddingTop:width*0.07, flex:1, justifyContent:'space-between'}}>
    <Text style={{alignSelf:'center', fontSize: moderateScale(15), fontFamily:fontFamily.Regular}}>Date of Birth</Text>
  {console.warn(validdate, validEmail,validValidity, route.params.shared_list)}
  <View
                style={{
                //   flex:0.9,
                  // margin: 10,
                  // flexDirection: 'row',
                  height:width *0.12,
                  alignSelf:'center',
                justifyContent:'center',
          
                // backgroundColor:'#F7F6F6',
                }}>
                <TouchableWithoutFeedback onPress={showDatePicker}>

                <Image
                      source={require('../../Assets/calender.png')}
                      style={{height: scale(25), width: scale(25), position: 'absolute',zIndex:1,left:4}}
                    />
                 
                 
                </TouchableWithoutFeedback>
                <TextInput
                  placeholder={'Date of Birth is used for Validation'}
                  value={date}
                  onChangeText={text => {
                    setName(text);
                  }}
                  editable={false}
                  style={{
                    backgroundColor:'#F7F6F6',
                    borderBottomColor: '#FFFFFF',
                    borderBottomWidth:1,
                    fontSize: 15,
                fontFamily:fontFamily.SemiBold,
                color: '#666666',
                    width:width *0.844,
                    height:width *0.12,
                    paddingLeft:50,
                  }}
                />
                
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    value={date}
                    format="YYYY-MM-DD"
                    maximumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    onDateChange={date => {
                      setDate(date);
                    }}
                  />
             
             
  
               
              </View>
  </View> */}


  <View style={{  height: height * 0.15, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <TouchableOpacity
          onPress={
            () => onsubmit()
            // navigation.navigate('Home')
          }>
          <View
            style={{
              // height: width * 0.5,
              // padding:10,
              width:width * 0.91,

              // backgroundColor: '#0EA1D8',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#0EA1D8',

              // marginTop:2,
            }}>
              {/* <LinearGradient  
                    start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                    locations={[0,0,1]}
                    colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                    style={styles.linearGradient}> */}
                    <Text style={styles.buttonText}>
                    SHARE
                    </Text>
                  {/* </LinearGradient> */}
            {/* <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Bold}}>
              Next
            </Text> */}
          </View>
        </TouchableOpacity>


      </View>
            </View>
  
           
          </ScrollView>
     
        </SafeAreaView>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
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
  