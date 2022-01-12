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
  Linking,
} from 'react-native';
import Styles from '../Components/Styles';
import {AuthContext} from '../Utils/AuthContext';
import {resetStore} from '../redux/resetStore/resetAction';
import {useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');

import { moderateScale, scale } from 'react-native-size-matters';

import changePin from '../Assets/lock.jpeg';
import recDelete from '../Assets/delete-side.png';
import billings from '../Assets/billing.png';
import settings from '../Assets/settings.png';
import logout from '../Assets/logout.png';
import profile from '../Assets/profile.png';


import AntIcon from 'react-native-vector-icons/AntDesign';
import { fontFamily } from '../Utils/fonts';
export default function SidePanel({navigation, route}) {
  const {user, token} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
  const {setLogout} = useContext(AuthContext);
  const {setUser} = useContext(AuthContext);

  const dispatch = useDispatch();
  {
    return (
      <View style={Styles().container}>
        {/* <View style={{flex: 0.16, backgroundColor:'#0EA1D8', 
              height: height * 0.15,
              flexDirection: 'row',justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              textAlign:'center',}}>
        
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  textAlign:'center',
                }}
              >
                <View>
                  <Image
                    source={require('../Assets/dummy.png')}
                    style={{height: 30, width: 30, borderRadius: 30 / 2,backgroundColor:'#fff'}}
                  />
                </View>
                <Text style={{paddingLeft: 5,fontFamily:fontFamily.Bold,color:'#fff'}}>
                  {user.fname} {user.lname}
                </Text>
              </View>

        </View> */}

      <View style={{flexDirection: 'row',alignItems: 'center',height: height * 0.09, borderBottomColor:'#5A6262',borderBottomWidth:0.5, marginTop: 40}}>

      <Image source={profile} style={{height:scale(25), width: scale(18), marginLeft: 20}} resizeMode={'contain'}/>
        <TouchableOpacity   onPress={() => navigation.navigate('AddProfile')}>
          <Text style={{color: '#5A6262', paddingLeft: 10, fontSize: moderateScale(14),fontFamily:fontFamily.Regular}}>Profile </Text>
        </TouchableOpacity>
      </View>
        
        

        <View style={{flexDirection: 'row',alignItems: 'center',height: height * 0.09, borderBottomColor:'#5A6262',borderBottomWidth:0.5}}>

           <Image source={changePin} style={{height:scale(18), width: scale(18), marginLeft: 20}} resizeMode={'contain'}/>
              <TouchableOpacity   onPress={() => navigation.navigate('ChangePIN')}>
                <Text style={{color: '#5A6262', paddingLeft: 10, fontSize: moderateScale(14),fontFamily:fontFamily.Regular}}>Change PIN </Text>
              </TouchableOpacity>
        </View>

       
        <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.09, borderBottomColor:'gray', borderBottomWidth:0.5}}>
           <Image source={recDelete} style={{height:scale(18), width: scale(18), marginLeft: 20}} resizeMode={'contain'}/>
            <TouchableOpacity onPress={() => navigation.navigate('RecentlyDeleted')}>
              <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}> Recently Deleted</Text>
            </TouchableOpacity>
        </View>

          <View style={{flex: 0.8}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: height * 0.09,
                
                borderBottomColor:'gray',
                borderBottomWidth:0.5,
              }}>

           <Image source={billings} style={{height:scale(18), width: scale(18), marginLeft: 20}} resizeMode={'contain'}/>
                
              <TouchableOpacity onPress={() => navigation.navigate('openBillings')} >
                <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}>Billing</Text>
              </TouchableOpacity>
            </View>

            <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.09,
              
              borderBottomColor:'gray',
              borderBottomWidth:0.5,
            }}>
           <Image source={settings} style={{height:scale(18), width: scale(18), marginLeft: 20}} resizeMode={'contain'}/>

            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}>Settings</Text>
            </TouchableOpacity>
          </View>
       

          <View style={{height: height * 0.1, marginTop: '2%',}}>
          
         
            <TouchableOpacity
              onPress={() => {
                setLogout(true); setUser('');
                setToken(''), dispatch(resetStore());
                navigation = {navigation};
              }} 
              style={{  flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.09,
              borderBottomColor:'gray'}}>

           <Image source={logout} style={{height:scale(18), width: scale(18), marginLeft: 18}} resizeMode={'contain'}/>

            <Text style={{color: '#0EA1D8', left: width * 0.03, fontSize:  moderateScale(14), fontFamily:fontFamily.Regular}}>
              Log out
            </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
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
});
