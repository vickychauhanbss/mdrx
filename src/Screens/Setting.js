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
  SafeAreaView,
  Platform
} from 'react-native';
import Styles from '../Components/Styles';
import {AuthContext} from '../Utils/AuthContext';
import {resetStore} from '../redux/resetStore/resetAction';
import {useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');


import { moderateScale, scale } from 'react-native-size-matters';

import contact from '../Assets/contact.png';
import help from '../Assets/help.png';
import privacy from '../Assets/privacy.png';
import term from '../Assets/terms.png';


// import AntIcon from 'react-native-vector-icons/AntDesign';
import { fontFamily } from '../Utils/fonts';
export default function Setting({navigation}) {
  const {user, token} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
  const {setLogout} = useContext(AuthContext);
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});
  const dispatch = useDispatch();
  {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

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
              <Image source={require('../Assets/back.png')}  style={{height: scale(20), width: scale(20)}} />
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
                    source={require('../Assets/dummy.png')}
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </TouchableOpacity>
              <Text style={{ fontSize: moderateScale(16), marginHorizontal: 20,  fontFamily:fontFamily.Bold , color:'#000',}}>
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
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop:15,
              }}>
             
              <Text style={{paddingLeft: 5,fontFamily:fontFamily.Bold, color:'#5A6262',fontSize: moderateScale(16)}}>
                Settings
              </Text>
             
          </View>

        <View
            style={{
              flexDirection: 'row',
              height: height * 0.05,
              marginTop:25,
            }}>



            <Text style={{color: '#0EA1D8', paddingLeft: 10, fontSize: moderateScale(14),fontFamily:fontFamily.Bold}}>
              Help
            </Text>
          </View>

        <View
            style={{
            
              flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.07,
              borderBottomColor:'#5A6262',
              borderBottomWidth:0.5,
              
            }}>

           <Image source={help} style={{height:scale(20), width: scale(20), marginLeft: 20}}/>

             

            <Text style={{color: '#5A6262', paddingLeft: 10, fontSize: moderateScale(14),fontFamily:fontFamily.Regular}} 
             onPress={() => navigation.navigate('OpenUrl', {
              url: 'https://mdrxonline.com/useraccount/faq/'
            })}
            >
             Help Center
            </Text>
          </View>

       
          <View
            style={{
            
              flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.07,
              borderBottomColor:'gray',
              borderBottomWidth:0.5,
            
            }}>

           <Image source={contact} style={{height:scale(20), width: scale(18), marginLeft: 20}}/>


            <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}
            onPress={() => navigation.navigate('ContactUs')}
            >
             Contact Us
            </Text>
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              height: height * 0.05,
              marginTop:25,
            }}>
            <Text style={{color: '#0EA1D8', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Bold}}>
              Legal
            </Text>
          </View>

          <View style={{flex: 0.8}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: height * 0.07,
                
                borderBottomColor:'gray',
                borderBottomWidth:0.5,
              }}>

           <Image source={term} style={{height:scale(20), width: scale(18), marginLeft: 20}}/>
                
              <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}
              onPress={() => navigation.navigate('OpenUrl', {
                url: 'https://mdrxonline.com/terms-n-conditions/'
              })}
              >
                Terms and Conditions
              </Text>
            </View>

            <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.07,
              
              borderBottomColor:'gray',
              borderBottomWidth:0.5,
            }}>
           <Image source={privacy} style={{height:scale(20), width: scale(18), marginLeft: 20}}/>

            <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14),fontFamily:fontFamily.Regular}}
            onPress={() => navigation.navigate('OpenUrl', {
              url: 'https://mdrxonline.com/privacy-policy/'
            })}
            >
              Privacy Policy
            </Text>
          </View>

          {/* <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.07,
            }}>
            <Icon1 name={'help-circle'} size={30} />
            <Text style={{color: '#5A6262', paddingLeft: 10, fontSize: 18,fontFamily:fontFamily.SemiBold}}>
              Help
            </Text>
          </View> */}
       

          <View style={{ flexDirection: 'row',
              alignItems: 'center',
              height: height * 0.07,
              
              borderBottomColor:'gray',
              borderBottomWidth: 0.5,}}>
            {/* <Text onPress={()=> navigation.navigate('ChangePIN')} style={{color: '#5A6262', paddingLeft: 10, fontSize: 18,fontFamily:fontFamily.Regular}}>
              Change PIN
            </Text> */}
           <Image source={privacy} style={{height:scale(20), width: scale(18), marginLeft: 20}}/>

            <TouchableOpacity
             onPress={() => navigation.navigate('OpenUrl', {
              url: 'https://mdrxonline.com/gdpr/'
            })}>


            <Text style={{color: '#5A6262', paddingLeft: 10, fontSize:  moderateScale(14), fontFamily:fontFamily.Regular}}>
              GDPR Policy
            </Text>
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
});

