import React, {Component, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView
} from 'react-native';
import {AuthContext} from '../../Utils/AuthContext';
const {height, width} = Dimensions.get('window');
import { fontFamily } from '../../Utils/fonts';

import { moderateScale, scale } from 'react-native-size-matters';
import Video from 'react-native-video'


export default function OpenVideoUrl({navigation, route}) {

  console.log('route++++++', route);

  const { url } = route.params

  console.log('url++++++', url);

  const videoPlayer = useRef(null);

  const {user, token, cookies} = useContext(AuthContext);



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
        <View style={styles.container}>

            <Video
              source={{ uri: url }}
              onFullScreen={true}
              controls={true}
              ref={videoPlayer} 
              resizeMode={'cover'}
              style={{ position: 'absolute', top: 0,left: 0,bottom: 0,right: 0, }}

              // style={styles.backgroundVideo}
            /> 

        </View>


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


  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

