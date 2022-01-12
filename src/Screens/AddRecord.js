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
  Alert,FlatList,
  //   Button,
  Platform,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  SafeAreaView
} from 'react-native';
import Styles from '../Components/Styles';
import {AuthContext} from '../Utils/AuthContext';
const {height, width} = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Material from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {typeAction} from '../Service/RecordType';
import { fontFamily } from '../Utils/fonts';
import DocumentPicker from 'react-native-document-picker';
import { Card } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale } from 'react-native-size-matters';

import {Picker} from '@react-native-picker/picker';
import Modal from "react-native-modal";
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';

const countries = ["Egypt", "Canada", "Australia", "Ireland", "Egypt", "Canada", "Australia", "Ireland"]
const currentData = new Date()

export default function Home({
  navigation,
  uploadReport,
  fileUploadSuccess,
  fileUploadFailMsg,
  reportMsgRead,
  route,
  EditReport,
  editmessage,
  editDetails,
  editSuccess,
  editFail,
  editFileMsgRead,
}) {
  const {user, token} = useContext(AuthContext);
  const refRBSheet = useRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filePath, setFilePath] = useState({});
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([]);
  const [filename, setfileName] = useState([]);
  const [date, setDate] = useState(moment(currentData).format('Do MMM, YYYY'));
  const [name, setName] = useState('');
  const [imageRes, setimageRes] = useState([]);
  const [note, setNote] = useState('');
  const [data , setdata] = useState([]);
  const [pic , setPic]= useState([]);
  const [flag, setflag]=useState(false)
  const [typeVal, setTypeVal] = useState(false)
  const [nameVal, setNameVal] = useState(false)
  const [submit, setSubmit] = useState(false);



  


  const[selectType, setSelectType] = useState('')


  

  const [selectedValue, setSelectedValue] = useState("java");

  const [isModalVisible, setModalVisible] = useState(false);



  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('apple');
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'}
  // ]);


  useEffect(() => {
    requestCameraPermission();
  }, []);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = date1 => {
    console.log('Beforedate', date1);
    var ds = date1.toString();
    // var NewDate = moment(new Date(ds.substr(0, 16)));
    const NewDate = moment(ds).format('Do MMM, YYYY');


    // console.log('54874=========>' + NewDate.format('DD/MM/YYYY'));
    setDate(NewDate);
    hideDatePicker();
  };

  const showAlert1 = (item , i) => {
    Alert.alert(  
        'Remove File',  
        'Do you want to delete selected file? Press yes to delete',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'Yes', onPress: () => del(item , i)},  
        ]  
    );  
}  



const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

  const controller = useRef(null);

  const uploadReportFiles = response => {
    setSubmit(true)
    
    if (selectType == '' || selectType == null) {
      return false;
    } else if (name == '') {
      return false;
    }   else if (date == '') {
      return false;
    }  
  

    var dateNew = moment(date, 'Do MMM, YYYY')
    const data = new FormData();
    filename.forEach((item, i) => {
      data.append('record_files', {
        uri: item.uri,
        type:item.type ? item.type : 'image/jpeg',
        name: item.filename || `filename${i}.jpg`,
      });
    });
    // data.append('record_files', source);
    data.append('record_name', name);
    data.append('date_record', dateNew.format('YYYY-MM-DD'));
    data.append('user_record_type', selectType);
    data.append('user_comment', note)
    // uploadReport(user.phoneNumber, data, onUploadProgress);
    uploadReport(data);
    // }

    // }
  };
  
  useEffect(() => {
    if (fileUploadSuccess) {
      Toast.show('Your record has been added successfully', Toast.SHORT, [
        'UIAlertController',
      ]);
      navigation.navigate('Dashboard');
      reportMsgRead();
    } else if (fileUploadFailMsg) {
      Toast.show(
        'Record document upload Failed due to some error.Please try again',
        Toast.SHORT,
        ['UIAlertController'],
      );
      reportMsgRead();
    }
    return () => {};
  });
  useEffect(() => {
    if (flag) {
      setPic(pic);
      setflag(false)
}
   
    return () => {};
  }, [flag, pic]);
  const del = (item, i) => {
    const newPic = pic;
    setflag(true)
    // alert(i)
    pic.splice(i),
    setPic([...pic])
    console.warn('checkitem', item);
    console.warn('checkindex', i);
    // setPic(newPic.splice(i))
    filename.splice(i);
    
  }
  const cameraLaunch = () => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      console.warn(options)
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
       
      } else {
        const source = {uri: res.uri};
        console.log('response', JSON.stringify(res));

        if (res.type){
          addfile1('Scan_'+new Date().getTime().toString() + '.'+res.type)
          filename.push(res);
        }
        else if (res.assets){
          addfile1('Scan_'+new Date().getTime().toString() + '.'+res.assets[0].type)
          filename.push(res.assets[0]);
        }
        // pic.push('Scan_'+new Date().getTime().toString() + '.'+res.type);
        // filename.push(res);
        // alert(res.fileName)
        // uploadReportFiles(res);
        // setimageRes(res);
        refRBSheet.current.close();
      }
    });
  };
  // setPic(pic => [...pic, res]);
  const addfile1 = res => {
    setPic(pic => [ ...pic, res]);
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // alert(JSON.stringify(response))
      if (response.type){
        addfile1('Scan_'+new Date().getTime().toString() + '.'+response.type)
        filename.push(response);
      }
      else if (response.assets){
        addfile1('Scan_'+new Date().getTime().toString() + '.'+response.assets[0].type)
        filename.push(response.assets[0]);
      }
      // filename.push(response);
      // pic.push(response.fileName);
      // addfile1(response.fileName)
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
    
      setimageRes(response);
      refRBSheet.current.close();
    });
  };
  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        // alert(JSON.stringify(res.name))
        if(res.type){
          filename.push(res);
          addfile1(res.name)
        }
       
        // pic.push(res.name);
      
        setimageRes(res);
        refRBSheet.current.close();
      }
      
      //Setting the state to show multiple file attributes
    
   
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const Item = ({title, index}) => (
    <View
      // onPress={() =>
      //   navigation.navigate('EditRecord', {
      //     slug: title.slug,
      //   })
      // }
      style={{
        flexDirection: 'row',
        height:60,
        width:width - width * 0.11,
        // padding: 10,
        // margin: 10,
        // flex: 1,
        // right:10,
        justifyContent: 'center',
        // alignSelf:'center'
          // backgroundColor: 'red',
      }}>
  {console.warn('adhjad',title)}
      <View style={styles.item}>
        <Ionic
          name={'md-document'}
          size={25}
          color="#0EA1D8"
          style={{alignSelf: 'center'}}
        />
        <View
          style={{flex: 0.8, justifyContent: 'center', alignSelf: 'center'}}>
         <Text  numberOfLines={3} style={{fontSize: 14, fontFamily:fontFamily.Regular, color:'blue', left:6}}>{item}</Text>
       
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'center',
        
          }}>
          {/* <Text>Hiii</Text> */}
          <MaterialCommunityIcons
            name={'delete'}
            size={25}
            color={'#0EA1D8'}
             onPress={()=>showAlert1(item , i)}
            // onPress={()=> {refRBSheet1.current.open(title); SetId(title.id), setrecord(title.record_file)}}
            // style={{alignSelf:'flex-end',alignItems:'flex-end'}}
          />
        </View>
      </View>
    </View>
  );
  const renderItem = ({item}) => <Item title={item} />;
  useEffect(() => {
    typeAction().then(res => {
      console.log('res+++++++',res)

      setdata(res.data);
      // setItems(res.data)
    }
    );

}, []);
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
              <Image source={require('../Assets/back.png')}  style={{height: scale(20), width: scale(20)}} />
            </TouchableOpacity>
          
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                // marginLeft: '30%',
              }}>
              <TouchableOpacity  onPress={() => navigation.navigate('AddProfile')}>
                 <Image
                    source={require('../Assets/dummy.png')}
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </TouchableOpacity>
              <Text style={{ fontSize: moderateScale(16), marginHorizontal: 20, fontFamily:fontFamily.Bold , color:'#000',}}>
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
                    source={require('../Assets/menu.png')}
                    style={{height: scale(30), width: scale(25)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
       

          <View
            style={{
              flex: 1,
              padding: 20,margin:10,
                justifyContent:'center',
            }}>
              <View style={{flex:1, 
                }}>
              <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:"gray"}}>Record Type</Text>
              <View style ={{flexDirection:'column',  borderColor:'#d3d3d3',
                      // height:width *0.12,
                      backgroundColor:'#fff', borderWidth:0.5, width: '100%', 

                }}>


                <RNPickerSelect
                    onValueChange={(value) => {
                    setTypeVal(false);
                    setSelectType(value)}}
                    value={selectType}
                    style={styles.inputAndroid}
                    useNativeAndroidPickerStyle={false}

                    textInputProps={{style: { color: '#3598f7', 
                    fontFamily: fontFamily.Regular,
                      padding: 10,
                      fontSize: moderateScale(15),


                  }}}
                    // placeholder={{ label: "" }}
                    
                    items={
                      data.map(item=> ({label:  item.record_type,value:item.id}))
                  }
                />
              {(selectType == '' || selectType == null) && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular,  position:'absolute', left:0, bottom:-15}}>{'Select record type from list'}</Text> : null}

              </View>

           
         
           
              </View>
           <View style={{flex:1, paddingTop:width *0.04}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:"gray"}}>Record Name</Text>
           <TextInput
                placeholder={''}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                style={{
                  flex:0.9,
                  backgroundColor:'#FFF',
                  // borderBottomColor: '#FFFFFF',
                  borderWidth:0.5,
                  borderColor:'#d3d3d3',
                  // borderBottomWidth:1,
                  fontSize: moderateScale(15),
                  fontFamily:fontFamily.Regular,
                  // color: '#666666',
                  width:width *0.85,
                  height:width *0.11,
                  padding: 10,
                  color: '#3598f7',

                }}
              />
           { name == '' && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular,  position:'absolute', left:0, bottom:-15}}>{'Please enter record name'}</Text>: null } 

           </View>


           
            {/* </View> */}
            <View style={{paddingTop:width*0.04, }}>
              <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:"gray"}}>Record Date</Text>
                <TouchableOpacity
                    style={{
                      flex:0.9,
                      // margin: 10,
                      // flexDirection: 'row',
                      height:width *0.12,
                      width:width *0.85,
                      alignItem:'start',
                    justifyContent:'center',
                    borderWidth: 0.5,
                    borderColor:'#d3d3d3',
                    backgroundColor:'#ffff'
                    }}  onPress={showDatePicker}>
                    {/* <TouchableWithoutFeedback > */}

                    <Image
                      source={require('../Assets/calendar.png')}
                      style={{height: scale(25), width: scale(25), position: 'absolute',zIndex:1,right:4}}
                    />
                    
                    {/* </TouchableWithoutFeedback> */}

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

            
            <View
              style={{
                flexDirection: 'row',
                marginTop: width * 0.04,
                // justifyContent: 'flex-start',
                
              }}>
   
       
        
             
            </View>
            <TouchableOpacity  onPress={() => refRBSheet.current.open()}
              style={{ 
                  marginTop:2,
                  top:10,
                  height: 100,
                  backgroundColor: '#fff',
                  borderWidth: 0.5,
                  borderColor: '#d3d3d3',
                  borderRadius: 1,
                  // borderStyle: 'dashed',
                  // zIndex: 0,
                  padding:15,
                  width:width *0.85,

              }}
            >
                <View
                style={{
                 justifyContent:'center', alignItems:'center',
                
                  // elevation:5
                }}>


                  <Image
                      source={require('../Assets/upload.png')}
                      style={{height: scale(25), width: scale(25)}}
                      
                    />
                      <Text style={{fontFamily: fontFamily.Bold, fontSize: moderateScale(14), color:'#3598f7'}}>Add File</Text>
                </View>
                {/* <View style={{ position: 'absolute', left: -1, top: -1, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                <View style={{ position: 'absolute', left: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} />
                <View style={{ position: 'absolute', right: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} /> */}
            </TouchableOpacity>
            <View style={{ top:20}}>

            {/* <FlatList
              data={pic}
              renderItem={renderItem}
              keyExtractor={item => item.index}
            /> */}
             {pic.map((item, i) => {
              return  <View
              // onPress={() =>
              //   navigation.navigate('EditRecord', {
              //     slug: title.slug,
              //   })
              // }
              style={{
                flexDirection: 'row',
                height:70,
                width:'100%',
                // padding: 10,
                // margin: 10,
                // flex: 1,
                // right:10,
                justifyContent: 'center',
                // alignSelf:'center'
                  // backgroundColor: 'red',
              }}>
          {/* {console.warn('adhjad',title)} */}
         <View style={styles.item}>

         <Image source={require('../Assets/file.jpeg')}  style={{height: scale(18), width: scale(18), alignItems:"center", alignContent:'center', alignSelf:'center', marginLeft:4}}/>
           {/* <Ionic
             name={'md-document'}
             size={25}
             color="#0EA1D8"
             style={{alignSelf: 'center'}}
           /> */}
           <View
             style={{flex: 0.8, justifyContent: 'center', alignSelf: 'center'}}>
            <Text numberOfLines={3} style={{fontSize: 14, fontFamily:fontFamily.Regular, color:'#000', left:6}}>{item}</Text>
          
           </View>
           <View
             style={{
               flex: 0.3,
               flexDirection: 'row',
               justifyContent: 'flex-end',
               alignSelf: 'center',
           
             }}>
             {/* <Text>Hiii</Text> */}
             <TouchableOpacity  onPress={()=>showAlert1(item , i)}>
              <Image  source={require('../Assets/delete.png')}  style={{height: scale(18), width: scale(18), marginRight:4}} />
             </TouchableOpacity>

             {/* <MaterialCommunityIcons
               name={'delete'}
               size={25}
               color={'#0EA1D8'}
                onPress={()=>showAlert1(item , i)}
               // onPress={()=> {refRBSheet1.current.open(title); SetId(title.id), setrecord(title.record_file)}}
               // style={{alignSelf:'flex-end',alignItems:'flex-end'}}
             /> */}
           </View>
         </View>
       </View>
      
         {/* <MaterialCommunityIcons name={'delete'} size={20} color={'#0EA1D8'} onPress={()=>showAlert1(item , i)}/> */}
        //  </View>;
       })}
             
             </View>

            <View style={{flex:1, paddingTop:width *0.15}}>
            <Text style={{fontFamily: fontFamily.Bold, fontSize: moderateScale(13), marginBottom:10,color:"gray"}}>Add Notes</Text>

              <TextInput
                placeholder={''}
                value={note}
                returnKeyType='done'
                onChangeText={text => {
                  setNote(text);
                }}
                multiline={true}
                style={{
                  // borderBottomColor: 'black',
                  backgroundColor: '#fff',
                  borderColor:'#d3d3d3',
                  borderWidth:0.5,
                  // borderWidth: 1,
                  fontSize: moderateScale(15),
                  height: width * 0.3,
                  width:width *0.85,

                  paddingLeft:20,
                  //borderRadius:15,
                  // opacity:1,
                  // elevation:5,
                  fontFamily:fontFamily.Regular,
                  color: '#3598f7',

                  // multiline={true}
                }}
              />
            </View>

            <TouchableOpacity  
             onPress={() => uploadReportFiles(imageRes)} style={{ alignItems: 'center',
             justifyContent: 'center'}}>
              <View
                style={{
                  // padding:30,
                  width: '100%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  elevation:4,
                  marginTop:'10%',
                  backgroundColor:'#0EA1D8'

                }}>

                {/* <LinearGradient  
                    start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                    locations={[0,0,1]}
                    colors={['#1E88B9', '#1E88B9', '#60cfdf']} 
                    style={styles.linearGradient}> */}
                    <Text style={styles.buttonText}>
                     SUBMIT
                    </Text>
                  {/* </LinearGradient> */}


                {/* <Text style={{color: '#fff', fontFamily:fontFamily.Bold}}>
                  SUBMIT
                </Text> */}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
              backgroundColor: '#0EA1D8',
            }}>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              borderRadius={15}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                },
                container: {
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}>
              <View style={{flexDirection: 'row', paddin: 5, marginLeft: 10}}>
              <Image  source={require('../Assets/camera.jpeg')}  style={{height: scale(25), width: scale(25)}} />

                {/* <Icon name={'camera'} size={25}  color={'#0EA1D8'}/> */}
                <TouchableOpacity
                  style={{paddingLeft: 10, marginTop:5}}
                  onPress={() => cameraLaunch('photo')}>
                  <Text style={{fontSize: 16}}>Camera</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
              <Image  source={require('../Assets/gellary.png')}  style={{height: scale(20), width: scale(20)}} />

                {/* <Icon name={'photo'} size={25}   color={'#0EA1D8'}/> */}
                <TouchableOpacity
                  style={{paddingLeft: 10, marginTop:5}}
                  onPress={() => chooseFile('photo')}>
                  <Text style={{fontSize: 16}}> Gallery</Text>
                </TouchableOpacity>
                
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
                <Image source={require('../Assets/file_new.png')}  style={{height: scale(20), width: scale(20), alignItems:"center", alignContent:'center', alignSelf:'center'}}/>

                {/* <Icon name={'file'} size={25}  color={'#0EA1D8'} /> */}
                <TouchableOpacity
                  style={{paddingLeft: 10, marginTop:5}}
                  onPress={() => selectMultipleFile()}>
                  <Text style={{fontSize: 16}}>  Files</Text>
                </TouchableOpacity>
                
              </View>
            </RBSheet>
          </View>
        </ScrollView>



        <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

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
      container: {
        flex: 1,
      },
      record: {
        flexDirection: 'row',
        padding: 6,
        margin: 5,
      },
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
        backgroundColor: '#F7F6F6',
        padding: 5,
      },
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
      },
      item: {
        flex: 1,
        // width: width * 0.8,
        // height: width * 0.13,
        backgroundColor: '#e5f0f9',
        borderRadius: 5,
        elevation: 3,
        // padding: 5,
        marginVertical: 8,
        // marginHorizontal: 16,
        flexDirection: 'row',
      },
      title: {
        fontSize: width * 0.0456,
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

      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'blue',
        paddingRight: 20, // to ensure the text is never behind the icon
      },
  
    

});
