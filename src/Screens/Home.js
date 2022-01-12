import React, { Component, useContext, useRef, useState, useEffect,useLayoutEffect } from 'react';
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
  Platform,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView

} from 'react-native';
import Styles from '../Components/Styles';
import { AuthContext } from '../Utils/AuthContext';
const { height, width } = Dimensions.get('window');
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card } from 'react-native-elements'

import { moderateScale, scale } from 'react-native-size-matters';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

import noData from '../Assets/no-data.png';

import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '../Components/slider'
import { fontFamily } from '../Utils/fonts';
import { ListUserAction, UsedData } from '../redux/actions/registerAction';
import { ProfileContext } from '../Utils/ProfileContext';
import ShareRecord from './ShareReacord/shareRecord';
import CustomCardPlan from '../Components/CustomCardPlan';
import { GET_DATA_USED, SAMPLE_USER_TOKEN } from '../apis';
import moment from 'moment';


function Home({
  navigation,
  uploadReport,
  fileUploadSuccess,
  fileUploadFailMsg,
  reportMsgRead,
  getAllPatientReport,
  getPatientRecords, 
  getRecentReport,
  recentReport,
  DeleteReport

}) {
  const {user, token} = useContext(AuthContext);
  const {profile,setProfile} = useContext(ProfileContext);
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});
  const [name,setName] = useState([])

  const [share,setShare] = useState([])

  const [dataUsedPercent, setDataUsedPercent] = useState(0)
  const [dataUsed, setDataUsed] = useState(0)
  const [dataTotal, setDataTotal] = useState(0)
  const [subscribedTo, setSubscribedTo] = useState('')


 
  const refRBSheet1 = useRef();
  // App.js



  const changeScreen = (pathName, payload) => {
    navigation.navigate(pathName, {...payload})
}
  const uploadReportFiles = response => {
    // if (fileValidations(response)) {
    const source = {
      name: response.fileName ? response.fileName : response.name,
      type: 'image/png',
      uri:
        Platform.OS === 'android'
          ? response.uri
          : response.uri.replace('file://', ''),
    };
    const data = new FormData();
    data.append('record_file', source);
    data.append('notes', 'test');
    data.append('record_name', 'recod');
    // uploadReport(user.phoneNumber, data, onUploadProgress);
    uploadReport(data);
    // }
  };
  useEffect(() => {
    getRecentReport();
  }, [])



  const getDataused = async () => {



    UsedData().then(response=>{

      console.log('response++++++', response)


      if(response.data){

        setDataUsedPercent(response.data.used_percent)
        setDataUsed(response.data.used_data)
        setDataTotal(response.data.total_data)
        setSubscribedTo(response.data.subscribed_to)

        // setProfile(response.data)
        //     console.log('profiledata', response.data.length);
      }
    })



    // let url = GET_DATA_USED

    // const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Token ${SAMPLE_USER_TOKEN}`,
    //     },
    // });

    // const { total_data, used_data, used_percent, subscribed_to } = await response.json();
    // console.log(await response.json());


    // console.log('total_data+++++', total_data)
    // console.log('used_data+++++', used_data)
    // console.log('used_percent+++++', used_percent)
    // console.log('subscribed_to+++++', subscribed_to)


    // setDataUsedPercent(used_percent)
    // setDataUsed(used_data)
    // setDataTotal(total_data)
    // setSubscribedTo(subscribed_to)
}

  useEffect(() => {
    getDataused()
}, [])

  useEffect(() => {

    if (fileUploadSuccess) {
      Toast.show('Report Document Upload Succesfully', Toast.SHORT, [
        'UIAlertController',
      ]);
      reportMsgRead();
    } else if (fileUploadFailMsg) {
      Toast.show(
        'Report Document Upload Failed, please try again.',
        Toast.SHORT,
        ['UIAlertController'],
      );
      reportMsgRead();
    }
    return () => { };
  });

;
  useEffect(() => {
    ListUserAction().then(response=>{
      if(response.data){
        setProfile(response.data)
            console.log('profiledata', response.data.length);
      }
    })
    return () => {
      
    }
  }, [])
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => true);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', () => true);
  // }, []);
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
      uploadReportFiles(response);
    });
  };
  useLayoutEffect(() => {
    if (recentReport.data) {
      // getProfile(user.phoneNumber);
      setName(recentReport.data);
      // setProfileImage(getProfileData.imageURL)
    }
  }, [recentReport]);
  useFocusEffect(
    React.useCallback(() => {
      getRecentReport();
      if (recentReport.data) {
        // getProfile(user.phoneNumber);
        setName(recentReport.data);
        // setProfileImage(getProfileData.imageURL)
      }
      ListUserAction().then(response=>{
        if(response.data){
          setProfile(response.data)
              console.log('profiledata', response.data.length);
        }
      })
    }, [])
  );

  const ShareRecord = (item) => {
    console.log('slug++++++', item.slug);
    navigation.navigate('Share', {shared_list: item.slug})

  }



  const showAlert = (data) => {
    Alert.alert(  
        'Delete record',
        'Do you want to delete your record?',  
        [  
            {text: 'Confirm', onPress: () =>   DeleteReport(data) },  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            // {text: 'Cancel', onPress: () => console.log('OK Pressed')},  
        ],  
        {cancelable: false}  
    )  
} 

  const deleteRecord = (item) => {
      const data = new FormData();
      data.append('record_list', item.slug);
      // Alert.alert(content);
      showAlert(data)
  
  };

  const Item = ({title}) => (
    <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 5,
          // margin:5,
          flex: 1,
          justifyContent:'center',
          // elevation:3,

          
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
            shadowOpacity: 0.23,
            shadowRadius: 4.65,

            elevation: 2,

        //   backgroundColor: 'red',
        }}>
      

        <View style={styles.item}>

          <TouchableOpacity style={styles.inneritem} onPress={() =>
              navigation.navigate('viewRecords', {
                slug: title.slug,
              })
            }>


          <Text style={styles.title, {fontFamily:fontFamily.Regular, fontSize: moderateScale(11)}}> </Text>


          <View style={styles.title, {fontFamily: fontFamily.Regular, fontSize: moderateScale(11), backgroundColor:'#e1ecf4', padding:6, textAlign:'center', borderRadius:10, borderWidth:1, borderColor:'#e1ecf4', marginRight:20}}>
            {/* <View style={{flexDirection:'row'}}> */}
            <Text style={{fontSize:20, color:'#55b1f7', fontFamily: fontFamily.Bold, textAlign:'center', height:30}}>
              {moment(title.date_record).format('DD')}  {"\n"}
            </Text> 

            <View style={{flexDirection:'row', marginTop:0}}>
              <Text style={{marginLeft:3}}>{moment(title.date_record).format('MMM')},</Text>
              <Text >{moment(title.date_record).format('YYYY')}</Text>
            </View>

          </View>

            <View style={{width:"50%",  justifyContent:'center', alignSelf:'center',left:5}}>
              <Text style={styles.title, {fontFamily:fontFamily.Bold, fontSize: moderateScale(13)}}>{title.record_name}</Text>
              <Text style={styles.title, { fontFamily:fontFamily.Regular, fontSize: moderateScale(11)}}>{title.record_type_name}</Text>
            </View>
           


            </TouchableOpacity>

            <View style={{flex:0.40, height:'100%', marginTop:'5%', zIndex:99999}}>
              <MenuProvider style={{position:'absolute', right:0}}>
              <Menu  >
                <MenuTrigger>
                  <Image  source={require('../Assets/dots.png')}  style={{height: scale(20), width: scale(20)}} />  
                </MenuTrigger>
                
                <MenuOptions style={{marginTop:-5}}>
                  <MenuOption onSelect={() => ShareRecord(title)}   style={{marginLeft:'3%'}}>
                    <Text style={{color: 'green', fontSize: 17, fontFamily: fontFamily.Regular}}>Share</Text>
                  </MenuOption>

                  <MenuOption onSelect={() => deleteRecord(title)} style={{marginLeft:'3%'}} >
                    <Text style={{color: 'red', fontSize: 17, fontFamily: fontFamily.Regular}}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
              </MenuProvider>
            </View>

            <View style={{ position:'absolute', right:'5%', bottom:10}}>
                <Text style={styles.title,{fontFamily:fontFamily.Regular, fontSize: moderateScale(12)}}>{title.files_num}{title.files_num > 1 ? ' Files' : 'File'} {',' + title.total_size}</Text>
                {/* <Text style={styles.title,{fontFamily:fontFamily.Regular, fontSize: moderateScale(12)}}>{title.total_size}</Text> */}
            </View>
            
        </View>
      </TouchableOpacity>
  );
  const renderItem = ({item}) => <Item title={item} />;


  {
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'#ffffff'}}>
        <View style={{
              width: width,
              height: height * 0.06,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row', 
              backgroundColor:'#fff', 
              // marginTop:'8%',
              paddingBottom:20,
              borderBottomWidth: 1,
              borderBottomColor: '#D0D0D0',
             
              
            }}>


            
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: '5%',
              }}>

                
              <TouchableOpacity  onPress={() => navigation.navigate('AddProfile')}>
                <Image
                    source={require('../Assets/dummy.png')}
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#fff'}}
                  />
              </TouchableOpacity>
              <Text style={{fontSize: moderateScale(16), marginHorizontal:20, color:'#000' ,fontFamily:fontFamily.Bold}}>
                {user.fname} {user.lname}
              </Text>
             
            </View>
            <View
              style={{
                marginRight: '1%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <View style={{ marginRight: 10 }}>


                <Image
                    source={require('../Assets/menu.png')}
                    style={{height: scale(30), width: scale(30)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          {/* </ImageBackground> */}
        </View>
        <ScrollView  style={{flex: 1}}>

          <View>
            {/* <Text></Text> */}

              <CustomCardPlan 
                changeScreen={changeScreen}
                subscribedTo={subscribedTo}
                dataUsedPercent={dataUsedPercent} 
                dataUsed={dataUsed} 
                dataTotal={dataTotal}  
              />
          </View>



          <Slider/>

          <View style={{flexDirection:'row'}}>

          {name.length > 0  && <TouchableOpacity style={{marginTop:'5%', marginHorizontal:10,  width:'35%',backgroundColor:'#F7F7F7',  padding:8, borderRadius:20 }}  onPress={() => navigation.navigate('RecordDetail')}>
            <Text style={{textAlign:'center',fontSize: moderateScale(12), fontFamily: fontFamily.Regular }}>{'All Records'}</Text> 
          </TouchableOpacity> }

          <TouchableOpacity style={{marginTop:'5%', backgroundColor:'#55b1f7', marginHorizontal:10,  width:'35%', padding:8, borderRadius:20, flexDirection:'row'}}  onPress={() => navigation.navigate('AddRecord')}>
              <Image source={require('../Assets/plus.png')} style={{height: scale(20), width: scale(20)}}  resizeMode='contain'/>
              <Text style={{textAlign:'center',fontSize: moderateScale(12), color:'#fff', fontFamily: fontFamily.Bold, marginLeft: 10, marginTop:3}}>{'Add Records'}</Text> 
          </TouchableOpacity>
          </View>


        

          {/* </View> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '8%',
            }}>
            <View
              style={{
                // height: 160,
                width: width - 30,
                // borderRadius: 10,
                // alignItems: 'center',
                // borderWidth: 0.5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // marginTop: 10,
                }}>
                <View style={{flex:1}}> 
                  <Text
                    style={{
                      justifyContent:'flex-start', 
                      alignSelf:'flex-start',
                      color: '#5A6262',
                      fontWeight: 'bold',
                      fontFamily:fontFamily.Bold,
                      fontSize: moderateScale(14),
                      marginLeft:5
                    }}>
                    Latest Medical Records
                  </Text>
                </View>
              </View>
              <View style={{}}>
                {name.length > 0 ? 
                  <FlatList
                    data={name}
                    renderItem={renderItem}
                    keyExtractor={item => item.slug}
                    contentContainerStyle={{
                      flexGrow: 1,
                      }}
                  />: 
                  
                  <View style = {{justifyContent:'center', alignSelf:'center', height:200, flex:0.4, marginTop:50, backgroundColor:'#eff6fc', width:'100%'}}>
                    {/* <Image source={noData} style={{height: scale(150), width: scale(150)}}  resizeMode='contain'/> */}
                    <Text style={{textAlign:'center', fontFamily:fontFamily.Bold, fontSize: moderateScale(12), color:'#5A6262'}}>{"No Records Exists for you."}</Text>
                  </View>
                }

                { name.length > 2 ? <TouchableOpacity style={{justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end', marginRight:10 }} onPress={() => navigation.navigate('RecordDetail')}><Text style={{ color:'#3598f7', fontFamily: fontFamily.Bold}}>Load more..</Text></TouchableOpacity> : null}

               
              </View>

            </View>
    
            {console.warn('dscsc',user)}
          </View>
        
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default React.memo(Home);
const styles = StyleSheet.create({
  

  item: {
    flex: 1,
    // height:80,
    backgroundColor: '#F7F7F7',
    borderRadius:5,

    padding: 10,
    // marginHorizontal: 5,
    flexDirection:'row',
    elevation:2,

    
  },

  inneritem:{
    flex: 1,
    // height:80,
    backgroundColor: '#F7F7F7',
    // borderRadius:5,

    padding: 10,
    // marginHorizontal: 5,
    flexDirection:'row',

  },

  triggerText: {
    color: 'white',
  },
  triggerWrapper: {
    padding: 5,
    backgroundColor: 'blue',
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
  },

  menuOptions: {
    // padding: 50,
    // marginTop:100
  },
});
