import React, {
  Component,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  Platform,
  TouchableWithoutFeedback,
  FlatList, 
  Linking,
  PermissionsAndroid,
  SafeAreaView
} from 'react-native';

import ReadMore from '@fawazahmed/react-native-read-more';
import Ionic from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import Styles from '../../Components/Styles';
import {AuthContext} from '../../Utils/AuthContext';
const {height, width} = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Material from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { fontFamily } from '../../Utils/fonts';
// import RNFetchBlob from 'rn-fetch-blob'
import { EditRecordDelete, EditRecordRename, typeAction } from '../../Service/RecordType';
import { moderateScale, scale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
// import LinearGradient from 'react-native-linear-gradient';

import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {Card} from 'react-native-elements';
import { APP_BASE_URL } from '../../Utils/apiConfig';


import Modal from "react-native-modal";
export default function Home({
  navigation,
  UpdateReport,
  fileUpdateSuccess,
  fileUpdateFail,
  reportUpdateMsgRead,
  route,
  EditReport,
  editmessage,
  editDetails,
  editSuccess,
  editFail,
  editFileMsgRead,
  
}) {

  console.log('editDetails+++++++++', editDetails)
  console.log('route.params.slug+++++++++', route.params.slug)
  console.log('editSuccess+++++++++', editSuccess)

  
  const {user, token} = useContext(AuthContext);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [filePath, setFilePath] = useState([]);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [filename, setfileName] = useState([]);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [imageRes, setimageRes] = useState([]);
  const [note, setNote] = useState('');
  const [Id , SetId]=useState('');
  const[record , setrecord]=useState('');
  const [data , setdata]= useState([])
  const [Comments, SetComments]=useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [pic , setPic]= useState([]);
  const [recordLablel, setrecordLabel]=useState('')
  const[selectType, setSelectType]=useState('')
  const[rename, setRename]=useState('')
  const [submit, setSubmit] = useState(false);


  const [ isVisiableEdit, setIsVisiableEdit] = useState(false)

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};
  // const download = record_file => {
  //   const {config, fs} = RNFetchBlob;
  //   const d = new Date();
  // // alert(record)
  // refRBSheet1.current.close()
  //   const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
  //   const options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true, // true will use native manager and be shown on notification bar.
  //       notification: true,
  //       path: `${DownloadDir}/mdrx_${Math.floor(
  //         d.getTime() + d.getSeconds() / 2,
  //       )}.jpg`,
  //       description: 'Downloading.',
  //     },
  //   };


   
  //   config(options)
  //     .fetch('GET', record)
  //     .then(res => {
     
  //       console.log('do some magic in here', res);
  //   });
  // };

  const getLocalPath = () => {
    const filename = `prescription.pdf`;
    return `${RNFS.DocumentDirectoryPath}/${filename}`;
  };

  const downloadPdf = (report) => {
    refRBSheet1.current.close()
    console.log('report+++++', report)

    navigation.navigate('OpenFileUrl', {'url' : report});


  //   if(record===undefined){
  //    alert('record is just choosen by , it can not open ')
  //   }
  //   else{
  //   if ( record) {
  //     const url = record;
  //     Linking.canOpenURL(record).then((supported) => {
  //       if (supported) {
  //         Linking.openURL(record);
  //       }
  //       else {
  //         console.log(`Don't know how to open URI: ${url}`);
  //         Toast.show('Download failed!', Toast.SHORT, ['UIAlertController']);
  //       }
  //     });
  //   }
  //   else {
  //     const url = report;
  //     // console.log(url);
  //     Linking.canOpenURL(url).then((supported) => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       }
  //       else {
  //         console.log(`Don't know how to open URI: ${url}`);
  //         Toast.show('Download failed!', Toast.SHORT, ['UIAlertController']);
  //       }
  //     });
  //   }
  // }
  };


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

  
//   const downloadFile = () => {
//     refRBSheet1.current.close()
//     // console.warn('in')
//     // const localFile = getLocalPath();
//     const options = {
//       fromUrl: record,
//       // toFile: localFile,
//     };
//     // console.log('urlurl',options)
//     FileViewer.open(record)
//     .then(() => {
//       // Do whatever you want
//       console.log('Success');
//     })
//     .catch(_err => {
//       // Do whatever you want
//       console.log(_err);
//     });
// // }
//   };
  
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
    const NewDate = moment(ds).format('DD-MMMM-YYYY');
   
    // console.log('54874=========>' + NewDate.format('DD/MM/YYYY'));
    setDate(NewDate);
    hideDatePicker();
  };
  const controller = useRef(null);

  const uploadReportFiles = response => {
    setSubmit(true)
      // RNGRP.getRealPathFromURI('http://ec2-52-60-152-239.ca-central-1.compute.amazonaws.com:8000''+filename).then(filePath =>
      //   console.log('anotherrrr',filePath)
      // )
    const fileUpload = filename;
    const source = {
      name: response.fileName ? response.fileName : name,
      type: response.type ? response.type : 'image/png',
      uri:
        Platform.OS === 'android' ? response.uri === undefined ? APP_BASE_URL + fileUpload : response.uri : response.uri ? response.uri.replace('file://', '') : '',
    };


    if (recordLablel == '' || recordLablel == null) {
      return false;
    } else if (name == '') {
      // Toast.show('Please enter Record Date. ', Toast.SHORT, [
      //   'UIAlertController',
      // ]);
     
      return false;
    } else if (value == '') {
      // Toast.show('Select Record Type from list. ', Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      return false;
    }

    // }
    // else {
    var dateNew = moment(date, 'Do MMM, YYYY')

    const data = new FormData();
    imageRes.forEach((item, i) => {
      data.append('record_files', {
        uri: item.record_file ? item.record_file : item.uri,
        type: item.type ? item.type:'image/jpeg',
        name: item.fileName ? item.fileName  : item.name ,
      });
    });
    // data.append('record_files', source.uri);
    data.append('notes', note);
    data.append('record_name', name);
    data.append('date_record', dateNew.format('YYYY-MM-DD'));
    data.append('user_record_type', recordLablel);
    // uploadReport(user.phoneNumber, data, onUploadProgress);
    UpdateReport(route.params.slug, data);
    // }

    // }
  };



  useEffect(() => {
    requestCameraPermission();
  }, []);


  
  useEffect(() => {
    EditReport(route.params.slug);
    if (editSuccess) {
     
      setName(editDetails.record_name);
      setValue(editDetails.user_record_type);
      setDate(moment(editDetails.date_record).format('Do MMM, YYYY'));
      setfileName(editDetails.files);
      setNote(editDetails.notes);
      SetComments(editDetails.comments)
      setrecordLabel(editDetails.user_record_type)
      setSelectType(editDetails.record_type_name)
    }
  }, [EditReport, route.params.slug]);

  useLayoutEffect(() => {
    if (editSuccess) {

      setName(editDetails.record_name);
      setValue(editDetails.user_record_type);
      setDate(moment(editDetails.date_record).format('Do MMM, YYYY'));
      setfileName(editDetails.files);
      setrecordLabel(editDetails.user_record_type)
      setNote(editDetails.notes);

    }
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      EditReport(route.params.slug);
      
     
    }, [])
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (editSuccess) {
      setName(editDetails.record_name);
      setValue(editDetails.user_record_type);
      setDate(moment(editDetails.date_record).format('Do MMM, YYYY'));
      setfileName(editDetails.files);
      setNote(editDetails.notes);
     SetComments(editDetails.comments)
     setrecordLabel(editDetails.user_record_type)
      // navigation.navigate('Dashboard');
      editFileMsgRead();
    } else if (editFail) {
      Toast.show(
        'File Upload Failed, Please try again.',
        Toast.SHORT,
        ['UIAlertController'],
      );
      editFileMsgRead();
    }
    return () => {};
  },[editSuccess, editDetails]);


  useEffect(() => {
    if (fileUpdateSuccess) {
      Toast.show('Your record has been updated successfully.', Toast.SHORT, [
        'UIAlertController',
      ]);
      navigation.navigate('Dashboard');
      reportUpdateMsgRead();
    } else if (fileUpdateFail) {
      Toast.show(
        'Your record cannot be updated due to some error. Please try again',
        Toast.SHORT,
        ['UIAlertController'],
      );
      reportUpdateMsgRead();
    }
    return () => {};
  });
  const del = (item, i) => {
 
    pic.splice(i,1),
    setPic([...pic])
    console.warn('checkitem', item);
    console.warn('checkindex', i);
    // setPic(newPic.splice(i))
    imageRes.splice(i);
    
  }
  const addfile = res => {
    setPic(pic => [ ...pic, res]);
  };
  useEffect(() => {
    typeAction().then(res => {

      console.log('res++++++++', res)

      setdata(res.data);
      setItems(res.data)
    }
   
    );
    // alert(JSON.stringify(data))
}, []);

  const cameraLaunch = () => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);

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
        // setfileName(res.fileName);
        // filename.push(res);
        // alert(res.fileName)
        // uploadReportFiles(res);
        if (res.type){
          addfile('Scan_'+new Date().getTime().toString() + '.'+res.type)
          imageRes.push(res);
        }
        else if (res.assets){
          addfile('Scan_'+new Date().getTime().toString() + '.'+res.assets[0].type)
          imageRes.push(res.assets[0]);

          
        }
        
        refRBSheet.current.close();
      }
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
        // filename.push(res);
        // pic.push(new Date().getTime().toString() + res.type);
        if (res.type){
          addfile(res.name)
          imageRes.push(res);
        }
        // else if (res.assets){
        //   addfile('Scan_'+new Date().getTime().toString() + '.'+res.assets[0].type)
          
        // }
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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      // setfileName(response.fileName);
      // filename.push(response);

      // alert(JSON.stringify(response))
      if (response.type){
        addfile('Scan_'+new Date().getTime().toString() + '.'+response.type)
        imageRes.push(response);
      }
      else if (response.assets){
        addfile('Scan_'+new Date().getTime().toString() + '.'+response.assets[0].type)
        imageRes.push(response.assets[0]);
      }


      // if (response.type){
      //   addfile('Scan_'+new Date().getTime().toString() + '.'+response.type)
      //   imageRes.push(response);
      // }
    
      // imageRes.push(response);
      refRBSheet.current.close();
    });
  };
  const showAlert1 = (item ) => {
    Alert.alert(  
        'Remove File',  
        'Do you want to delete selected file? Press yes to delete',  
        [  
            {  
        text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),  
                // style: 'cancel',  
            },  
      {text: 'Yes', onPress: () => EditRecordDelete(Id).then(response=>{
        if(response.status== 200){
          refRBSheet1.current.close();
          EditReport(route.params.slug)

              console.log('Deleted Success');
        }
        else{
              alert('Record Not Deleted');
        }
      })
    },
        ]  
    );  
} 
const Comment = ({title, index}) => (
  

    <View style={{ 
      // flex:1,
      // width: width * 0.8,
      // height: width * 0.13,
      backgroundColor: '#F7F7F7',
      borderRadius: 5,
      // elevation: 3,
      padding: 10,
      marginVertical: 8,
      // marginHorizontal: 16,
      flexDirection: 'column'}}>
    
      <View style={{ flex:1,justifyContent: 'space-between', fontFamily:fontFamily.Regular, fontSize:14, flexDirection:'row'}}>
          <Text numberOfLines={10} style={{fontSize: moderateScale(14), fontFamily:fontFamily.Bold, left:3, width:'70%'}}>{title.comment_by}</Text>
          <Text style={{fontSize: moderateScale(12), fontFamily:fontFamily.Regular,  width:'30%', textAlign:'right'}}>{moment(title.comment_date_updated).format('Do MMM, YYYY')}</Text>
      </View>
      <View
        style={{
          // flex: 0.4,
          // flexDirection: 'row',
          // justifyContent: 'flex-end',
          // alignSelf: 'center',
      
        }}>
     <ReadMore numberOfLines={2} style={{fontSize: 14, fontFamily:fontFamily.Regular, left:6}} >
          {
          title.user_comment
          }
        </ReadMore>
      </View>
    </View>
);


const renameFile = (item) => {
  refRBSheet1.current.close();
  setTimeout(() => {setIsVisiableEdit(!isVisiableEdit)}, 500)
}


const renameFiles = () => {
  const paramsData ={
    new_name:  rename
  }
  EditRecordRename(Id, paramsData).then(response=>{
    if(response.status== 200){
      refRBSheet1.current.close();
      EditReport(route.params.slug)
      setIsVisiableEdit(false)
          console.log('Deleted Success');
    }
    else{
          alert('Record Not Deleted');
    }
  })
} 


const toggleModalEdit = () => {
  setIsVisiableEdit(!isVisiableEdit)
}

const Item = ({title, index}) => (
  <View
    // onPress={() =>
    //   navigation.navigate('EditRecord', {
    //     slug: title.slug,
    //   })
    // }
    style={{
      flexDirection: 'row',
      height:80,
      width:width,
      marginTop:5,
      
      // margin: 5,
      // flex: 1,
      right:15,
      justifyContent: 'center',
      //   backgroundColor: 'red',
    }}>

    <View style={styles.item}>

    <Image source={require('../../Assets/file.jpeg')}  style={{height: scale(20), width: scale(20), alignItems:"center", alignContent:'center', alignSelf:'center', marginLeft:5, marginRight:2}}/>

      {/* <Ionic
        name={'md-document'}
        size={30}
        color="#0EA1D8"
        style={{alignSelf: 'center'}}
      /> */}
      <View
        style={{flex: 0.8, justifyContent: 'center', alignSelf: 'center', fontFamily:fontFamily.Regular, fontSize:14}}>
       <Text onPress={()=> {setrecord(title.record_file); downloadPdf(title.record_file)}} numberOfLines={3} style={{fontSize: 14, fontFamily:fontFamily.Regular, color:'#000', left:6}}>{title.name === undefined? title.file_name ? title.file_name : title.fileName ? 'Scan_'+new Date().getTime()+'.'+title.type: title.fileName :title.name}</Text>
     
      </View>
      <View
        style={{
          // flex: 0.10,
          flexDirection: 'row',
          // justifyContent: 'flex-end',
          alignSelf: 'center',
          position:'absolute',
          right:40
      
        }}>
        {/* <Text>Hiii</Text> */}


        <TouchableOpacity onPress={()=> {refRBSheet1.current.open(title); SetId(title.id), setrecord(title.record_file) , setRename(title.file_name.split('.')[0])}}>
            <Image  source={require('../../Assets/dots.png')}  style={{height: scale(20), width: scale(20)}} />  
        </TouchableOpacity>


        {/* <MaterialCommunityIcons
          name={'dots-vertical'}
          size={25}
          onPress={()=> {refRBSheet1.current.open(title); SetId(title.id), setrecord(title.record_file)}}
          // style={{alignSelf:'flex-end',alignItems:'flex-end'}}
        /> */}
      </View>
    </View>
  </View>
);
const renderItem = ({item}) => <Item title={item} />;
const renderComment = ({item}) => <Comment title={item} />;
const SmallSheet=(item)=>{
  console.log('item+++++', item)
  return(
  <View>
    {/* {console.warn('msgggg',item)} */}

    <View  style={{flexDirection: 'row',  marginLeft: 10}}>
    <Image  source={require('../../Assets/rename.png')}  style={{height: scale(20), width: scale(18)}} resizeMode={'contain'} />

    {/* <Icon name={'download'} size={25} color={'#0EA1D8'} /> */}
    <TouchableOpacity
      style={{paddingLeft: 10}}
      onPress={() => renameFile(item)}>
      <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>Rename</Text>
    </TouchableOpacity>
  </View>

  <View
    style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
    <Image  source={require('../../Assets/download.png')}  style={{height: scale(20), width: scale(17)}} resizeMode={'contain'}/>

    {/* <Icon name={'download'} size={25} color={'#0EA1D8'} /> */}
    <TouchableOpacity
      style={{paddingLeft: 10}}
      onPress={() => downloadPdf(record)}>
      <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>Download</Text>
    </TouchableOpacity>
  </View>


  <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>

    <Image  source={require('../../Assets/delete.png')}  style={{height: scale(20), width: scale(20)}} />

    <TouchableOpacity
      style={{paddingLeft: 6}}
      onPress={(item,i) => showAlert1(item, i)}>
      <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>Delete</Text>
    </TouchableOpacity>
  </View>
  
  </View>)
}
// .then(response => {
//   console.log('response123456', response.status);
//   if (response.status === 200) {
//     navigation.navigate('OTPScreen', {email: route.params.email, pin: otp}),
//     Toast.show('Check your email and enter the Otp ', Toast.LONG);
//   }
//   else {
//     showAlert();
//     // Toast.show('please try to register with us', Toast.LONG);
//   }
// });
// }
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
              flex: 1,
              padding: 20,
              margin:10,
              justifyContent:'center',
            }}>
              <View style={{flex:1,}}>
              <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:"gray"}}>Record Type</Text>
              <View style ={{flexDirection:'column',  borderColor:'#d3d3d3',
                  backgroundColor:'#FFFF', borderWidth:0.5
                }}>

              {/* <Text>{recordLablel}</Text> */}


              <RNPickerSelect
              style={{ inputAndroid: { color: 'black' } }}
                value={recordLablel}
                onValueChange={(value) => setrecordLabel(value)}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: "" }}
                selectedValue={recordLablel}
                textInputProps={{style: { color: '#3598f7', 
                fontFamily:fontFamily.Regular,
                padding: 10,
                fontSize: moderateScale(15),
              }}}

                items={
                  data.map(item=> ({label:  item.record_type, value:item.id}))
              }
        />
              {recordLablel == '' || recordLablel == null ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular,  position:'absolute', left:0, bottom:-15}}>{'Select record type from list'}</Text> : null}



              </View>
               
         
      
              </View>
           <View style={{flex:1,justifyContent:'space-between', paddingTop:width * 0.04}}>
           <Text style={{alignItem:'start', fontSize: moderateScale(13), fontFamily:fontFamily.Bold, marginBottom:10, color:"gray"}}>Record Name</Text>
           <TextInput
                placeholder={'Enter record name'}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                style={{
                  flex:0.9,
                  backgroundColor:'#fff',
                  borderWidth:0.5,
                  borderColor:'#d3d3d3',
                  // borderBottomColor: '#FFFFFF',
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

           { name == '' ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular,  position:'absolute', left:0, bottom:-15}}>{'Please enter record name'}</Text>: null } 

           </View>
           
            {/* </View> */}
            <View style={{paddingTop:width * 0.04, flex:1,}}>
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
                backgroundColor:'#fff',
                borderColor:'#d3d3d3',
                borderWidth:0.5

                }} onPress={showDatePicker}>
                {/* <TouchableWithoutFeedback > */}

                <Image
                  source={require('../../Assets/calendar.png')}
                  style={{height: scale(23), width: scale(23), position: 'absolute',zIndex:1,right:4}}
                />
                
                {/* </TouchableWithoutFeedback> */}

                <Text style ={{alignSelf:'flex-start',fontFamily:fontFamily.Regular,  color: '#3598f7',  fontSize : moderateScale(15), padding : 10
                }}>{date}</Text>
              
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

        
              {/* <TouchableOpacity  onPress={() => refRBSheet.current.open()}
                style={{ 
                  marginTop:2,
                  top:20,
                  height: 100,
                  backgroundColor: '#d9ebfd',
                  // borderWidth: 2,
                  borderColor: 'gray',
                  borderRadius: 1,
                  // borderStyle: 'dashed',
                  zIndex: 0,
                  padding:10,
                }}>
                <View style={{justifyContent:'center', alignItems:'center',alignSelf:'center', marginTop:10}}>
                    <Image source={require('../../Assets/upload.png')} style={{height: scale(25), width: scale(25)}} />
                    <Text style={{fontFamily: fontFamily.Bold, fontSize: moderateScale(14)}}>Add File</Text>
                </View>
                <View style={{ position: 'absolute', left: -1, top: -1, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                <View style={{ position: 'absolute', left: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} />
                <View style={{ position: 'absolute', right: -1, top: -1, width: 1, height: '100%', backgroundColor: 'white', zIndex: 1 }} />
              </TouchableOpacity> */}

              <View style={{top:10}}>
                  <FlatList
                    data={filename}
                    renderItem={renderItem}
                    keyExtractor={item => item.index}
                  />
              </View>

              <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                <Text style={{textAlign:'right', marginTop:10, color:'#3598f7', fontFamily: fontFamily.Bold}}>Add More Files</Text>
              </TouchableOpacity>
          
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
                  width:width * 0.92,
                  top:'5%',
                  // padding: 40,
                  // margin: 10,
                  // flex: 1,
                  right:10,
                  //  justifyContent: 'center',
                  // alignSelf:'center'
                    // backgroundColor: 'red',
                }}>

                <View style={styles.itemNew}>

                    <Image source={require('../../Assets/file.jpeg')}  style={{height: scale(20), width: scale(20), alignItems:"center", alignContent:'center', alignSelf:'center', marginLeft:0}}/>

                  <View
                    style={{flex: 0.9, justifyContent: 'center', alignSelf: 'center'}}>
                    <Text numberOfLines={3} style={{fontSize: 14, fontFamily:fontFamily.Regular, color:'#000', left:6}}>{item}</Text>
                  
                  </View>
                  <TouchableOpacity
                    style={{
                      flex: 0.3,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignSelf: 'center',
                      marginRight:12
                  
                    }}   onPress={()=>del(item , i)}>

                    <Image  source={require('../../Assets/delete.png')}  style={{height: scale(18), width: scale(18)}} />
                  </TouchableOpacity>
                </View>
              </View>
              
                //  </View>;
              })}

             

            <View style={{marginTop: '2%'}}>
              <Text></Text>
              <FlatList
                data={Comments}
                renderItem={renderComment}
                keyExtractor={item => item.index}
              /> 
            </View>
            <View style={{flexDirection:'row', top :10, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'center', width:width *0.84,
                }}>

              <TouchableOpacity  onPress={()=> navigation.navigate('AddNotes',{slug:route.params.slug, screen:'EditRecord'})} style={{borderWidth:1, borderColor:'#0EA1D8', height:45, width:width * 0.86,justifyContent: 'center',
                    alignItems: 'center',}}>
              <Text style={{alignSelf:'center', fontFamily: fontFamily.Regular, color:"gray"}}>Add Notes</Text>
              </TouchableOpacity>
           
            </View>

            {/* <View style={{flexDirection:'row', top:8, justifyContent:'center'}}> */}
                <TouchableOpacity onPress={()=> uploadReportFiles(imageRes)} style={{  alignItems: 'center',
             justifyContent: 'center'}}>
                <View
                style={{
                  // padding:30,
                  width:width * 0.86,
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
            {/* </View> */}

          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
              backgroundColor:'#0EA1D8'
            }}>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              borderRadius={15}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0,0,0,0.6)',
              },
                container: {
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}>
              <View style={{flexDirection: 'row',  marginLeft: 10}}>
              <Image  source={require('../../Assets/camera.jpeg')}  style={{height: scale(25), width: scale(25)}} />

                <TouchableOpacity
                  style={{paddingLeft: 5}}
                  onPress={() => cameraLaunch('photo')}>
                  <Text style={{fontSize: 16, marginTop: 6}}> Camera</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
              <Image  source={require('../../Assets/gellary.png')}  style={{height: scale(20), width: scale(20)}} />

                {/* <Icon name={'photo'} size={25} color={'#0EA1D8'} /> */}
                <TouchableOpacity
                  style={{paddingLeft: 10}}
                  onPress={() => chooseFile('photo')}>
                  <Text style={{fontSize: 16}}> Gallery</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
                <Image source={require('../../Assets/file_new.png')}  style={{height: scale(20), width: scale(20), alignItems:"center", alignContent:'center', alignSelf:'center'}}/>

                {/* <Icon name={'file'} size={25}  color={'#0EA1D8'} /> */}
                <TouchableOpacity
                  style={{paddingLeft: 10}}
                  onPress={() => selectMultipleFile()}>
                  <Text style={{fontSize: 16}}>  Files</Text>
                </TouchableOpacity>
                
              </View>
            </RBSheet>
          </View>
          
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
              backgroundColor:'#0EA1D8'
            }}>
            <RBSheet
              ref={refRBSheet1}
              closeOnDragDown={true}
              closeOnPressMask={true}
              borderRadius={15}
              // height={200}
              customStyles={{
              
                  wrapper: {
                      backgroundColor: 'rgba(0,0,0,0.6)',
                  },
                container: {
                  // height:200,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}>
              
              <SmallSheet/>
            </RBSheet>
          </View>
        </ScrollView>
      


      <Modal isVisible={isVisiableEdit}  swipeDirection="left" useNativeDriver={true}>
        <View style={{ flex: 1, backgroundColor:'#fff' ,maxHeight: 220 }}>

        <TouchableOpacity onPress={toggleModalEdit} style={{position:'absolute', right:0, zIndex:99999}}>
            <Image source={require('../../Assets/close.png')} style={{height: scale(25), width: scale(25)}} />
          </TouchableOpacity>

          <Text style={{fontFamily: fontFamily.Bold, fontSize: moderateScale(16), paddingLeft:10, paddingTop:10}}>Rename File</Text>
        

          <View style={{padding:20}}>
             <Text style={{top:10,left:10,bottom: 1, fontFamily: fontFamily.Regular, color:'#444444', fontFamily: fontFamily.Bold, fontSize: moderateScale(16)}}>
                   New Name
              </Text>
              <TextInput value={rename}
              placeholder='Rename file'
              autoCapitalize='none'

              
                onChangeText={text => {
                  setRename(text);
                
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
                color: 'gray',
                borderColor:'#DDDDDD',
                //borderWidth: show ? 0.6 :0

                }}
              />
          </View>


          <TouchableOpacity style={{position: 'absolute', right:10, bottom: 5, backgroundColor:"#127ba3", padding: 10}} onPress={renameFiles}>
              <Text style={{color: '#fff', fontFamily: fontFamily.Regular}}>{'Rename'}</Text>
          </TouchableOpacity>
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
      backgroundColor:'#eff6fc',
      borderRadius: 5,
      elevation: 3,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
    },


    itemNew: {
      flex: 1,
      // width: width * 0.8,
      // height: width * 0.13,
      backgroundColor: '#e5f0f9',
      borderRadius: 5,
      elevation: 3,
      padding: 5,
      marginRight: 15,
      marginVertical: 8,
      marginHorizontal: 10,
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
  
});
