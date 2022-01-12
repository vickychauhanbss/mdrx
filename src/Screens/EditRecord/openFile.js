import React, {Component, useContext, useRef, useState} from 'react';
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
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  SafeAreaView
} from 'react-native';
import Styles from '../../Components/Styles';
import {AuthContext} from '../../Utils/AuthContext';
import {resetStore} from '../../redux/resetStore/resetAction';
import {useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');
import { fontFamily } from '../../Utils/fonts';

import { moderateScale, scale } from 'react-native-size-matters';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';


export default function OpenFileUrl({navigation, route}) {

  console.log('route++++++', route);

  const { url } = route.params

  console.log('url++++++++', url.split('.').pop())



  const [visible, setVisible] = useState(false);
  const [fileExt, setFileExt] = useState(url.split('.').pop());



  const {user, token} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
  const {setLogout} = useContext(AuthContext);
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});
  const dispatch = useDispatch();


  const ActivityIndicatorElement = () => {
    //making a view to show to while loading the webpage
    return (
        <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator
                color="#3598f7"
                size="large"
            />
        </View>
    );
 };


 const Activity = () => {
  //making a view to show to while loading the webpage
  return (
      <View style={styles.activityInd}>
          <ActivityIndicator
              color="#3598f7"
              size="large"
          />
      </View>
  );
};


 const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ?
           /[^.]+$/.exec(fileUrl) : undefined;
};



const checkPermission = async () => {
    
  // Function to check the platform
  // If Platform is Android then check for permissions.

  if (Platform.OS === 'ios') {
    downloadFile();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile();
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        Alert.alert('Error','Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.log("++++"+err);
    }
  }
};



 const downloadFile = () => {
  setVisible(true)
    const {config, fs} = RNFetchBlob;
    const d = new Date();
    let file_ext = getFileExtention(url);
    const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // true will use native manager and be shown on notification bar.
        notification: true,
        path:  DownloadDir+ '/mdrx_' +  Math.floor(d.getTime() + d.getSeconds() / 2) + file_ext,
        description: 'Downloading.',
      },
    };


   
    config(options)
      .fetch('GET', url)
      .then(res => {
        setVisible(false)

        alert('File Downloaded Successfully.')
     
        console.log('do some magic in here', res);
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
            </View>
        </View>


       {fileExt != 'docx' && fileExt != 'zip' &&  fileExt != 'xlsx' && 
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{backgroundColor:'#fff'}}>
                <View style={styles.container}>
                    <WebView
                    style={{flex: 1, marginTop: 0}}
                    //Loading URL
                    source={{
                            uri: url
                        }} 
                    //Enable Javascript support
                    javaScriptEnabled={true}
                    //For the Cache
                    domStorageEnabled={true}
                    onLoadStart={() => setVisible(true)}
                    onLoad={() => setVisible(false)}
                    />
                    {visible ? <ActivityIndicatorElement /> : null}
                </View>
            </ScrollView>
    }

      {fileExt == 'docx' && 
        <View>
          <Text style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', marginTop:'50%', fontFamily: fontFamily.Regular}}>Preview of this file is not available</Text>
          <View style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', flexDirection:'row'}}>
            <TouchableOpacity onPress={checkPermission}><Text style={{color:'#3598f7', fontFamily: fontFamily.Bold}}>Click here</Text></TouchableOpacity>
            <Text style={{fontFamily: fontFamily.Regular}}> to download it</Text>
            {visible ? <Activity /> : null}

          </View>
        </View>
      }


        {fileExt == 'zip' && 
              <View>
                <Text style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', marginTop:'50%', fontFamily: fontFamily.Regular}}>Preview of this file is not available</Text>
                <View style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', flexDirection:'row'}}>
                  <TouchableOpacity onPress={checkPermission}><Text style={{color:'#3598f7', fontFamily: fontFamily.Bold}}>Click here</Text></TouchableOpacity>
                  <Text style={{fontFamily: fontFamily.Regular}}> to download it</Text>
                  {visible ? <Activity /> : null}

                </View>
              </View>
        }


          {fileExt == 'xlsx' && 
            <View>
              <Text style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', marginTop:'50%', fontFamily: fontFamily.Regular}}>Preview of this file is not available</Text>
              <View style={{textAlign:'center', alignContent:'center', alignItems:'center', alignSelf:'center', flexDirection:'row'}}>
                <TouchableOpacity onPress={checkPermission}><Text style={{color:'#3598f7', fontFamily: fontFamily.Bold}}>Click here</Text></TouchableOpacity>
                <Text style={{fontFamily: fontFamily.Regular}}> to download it</Text>
                {visible ? <Activity /> : null}

              </View>
            </View>
          }


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
    backgroundColor: '#fffff',
  },

  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },



  activityInd: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    justifyContent: 'center',
  },
});

