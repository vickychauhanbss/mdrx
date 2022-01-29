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
  TouchableWithoutFeedback,Alert,
  SafeAreaView

} from 'react-native';
import Styles from '../Components/Styles';
import { AuthContext } from '../Utils/AuthContext';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const { height, width } = Dimensions.get('window');
import { moderateScale, scale } from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';


import { fontFamily } from '../Utils/fonts';
import { changePin } from '../Service/RecordType';
import Modal from "react-native-modal";



const  ChangePin=({navigation, route})=> {
    const {user, token} = useContext(AuthContext);
    const[show, setshow]= useState(false);
    const [disable , setdisable]=useState(false)
    const [existing , setexisting] = useState('')
    const [newPIN, setnewPIN]=useState('') 
    const [confirmPIN, setconfirmPIN]=useState('') 
    const [isModalVisible, setModalVisible] = useState(false);
    const [modelText, setModelText] = useState(false);
    const [submit, setSubmit] = useState(false);




    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const loginCheck = () => {
      console.log('existing++++++', existing)
      setSubmit(true);
          if (existing == '' || existing.length < 4) {
            return false;
          } else if (newPIN == '' || newPIN.length < 4) {
            return false;
          } else if (confirmPIN == '') {
            return false;
          }
          else if (newPIN !== confirmPIN) {
            setModelText('Your New PIN does not match with Confirm PIN. Please make sure your PIN matches')
            setModalVisible(true)
            return false;
          }
          var form = new FormData();
          form.append('old_password', existing);
          form.append('new_password', newPIN);
          form.append('new_password2', confirmPIN);
          changePin(form).then(response => {
            console.log('response123456', response.status);
            if (response.status === 200) {
              showAlert()
            } else {
             setModelText('The current PIN does not match. Please make sure you enter correct PIN.')
             setModalVisible(true)


            }
          });
        // }
      };
      const showAlert = () => {
        Alert.alert(  
            'PIN Change',
            'Your PIN has been changed now',  
            [  
        // {text: 'OK', onPress: () => navigation.navigate('Home')},
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
        {text: 'OK', onPress: () => navigation.navigate("Dashboard")},
            ],  
            {cancelable: false}  
        )  
    } 
  return (
    <SafeAreaView
    style={{flex: 1, backgroundColor: '#FFFFFF'}}
    contentContainerStyle={{flex: 1}}>
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

        <View style={{flex:0.8, alignSelf:'center', top:width * 0.1}}>
          <View>
            <Text style={{fontSize: moderateScale(18), fontFamily: fontFamily.Bold, alignSelf:'flex-start'}}>Change PIN</Text>
          </View>
          <View style={{ top:width *0.1, alignContent:'center', alignItems:'center', alignSelf:'center'}}>
            <View style={{alignContent:'center', alignItems:'center', alignSelf:'center'}}>
            <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>Existing PIN</Text>  
              <OTPInputView
                style={{width: '70%', height: 24, marginTop:25}}
                pinCount={4}
                autoFocusOnLoad={true}
                code={existing}
                // clearInputs
                autoFocus={true}
                codeInputFieldStyle={{
                  width: 35,
                  height: 45,
                  marginLeft:20,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  color: show ? 'red': 'black',
                  borderColor: show ?'red': '#03DAC6'
                }}
                onCodeChanged={code => {
                  console.log('onCodeChanged++++', code)

                  setexisting(code)

                  if (code.length < 5) {
                    setdisable(false)
                    // setexisting(code)
                    // setexisting('')

                  }
                }

                }
                secureTextEntry={true}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                  setexisting(code);
                  if(code.length === 4){
                    setdisable(true)
                    setexisting(code)

                  } else{
                    setdisable(false)
                    setexisting(code)

                    // setexisting('')
                  }
                }}
                codeInputHighlightStyle={{borderColor: show ?'red': '#03DAC6'}}
              />

           {existing.length < 4 && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:10, bottom:-30}}>{'Enter your Existing 4 digit PIN'}</Text> : null }
           </View>

              <View style={{flex:0.6, alignSelf:'center', top:width *0.1, alignContent:'center', alignItems:'center', alignSelf:'center'}}>
                <View style={{alignContent:'center', alignItems:'center', alignSelf:'center'}}>

                <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>New PIN</Text>  
                  <OTPInputView
                    style={{width: '70%', height: 24, marginTop:25}}
                      pinCount={4}
                      autoFocusOnLoad={true}
                      code={newPIN}

                      // clearInputs
                      autoFocus={true}
                      codeInputFieldStyle={{
                        width: 30,
                        height: 45,
                        marginLeft:20,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        color: show ? 'red': 'black',
                        borderColor: show ?'red': '#03DAC6'
                      }}
                      onCodeChanged={code => {
                        setnewPIN(code);

                        if (code.length < 4) {
                          setdisable(false)
                        }
                      }

                      }
                      secureTextEntry={true}
                      onCodeFilled={code => {
                        console.log(`Code is ${code}, you are good to go!`);
                        setnewPIN(code);
                        if(code.length===4){
                          setdisable(true)
                        }
                        else{
                          setdisable(false)
                        }
                      }}
                      codeInputHighlightStyle={{borderColor: show ?'red': '#03DAC6'}}
                    />


                {newPIN.length < 4 && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:10, bottom:-30}}>{'Enter New 4 digit PIN'}</Text> : null }

                </View>
              <View style={{  top:width *0.1, alignContent:'center', alignItems:'center', alignSelf:'center'}}>
              <View style={{alignContent:'center', alignItems:'center', alignSelf:'center'}}>

                <Text style={{fontSize: moderateScale(16), fontFamily:fontFamily.Regular}}>Confirm PIN</Text>  
                  <OTPInputView
                    style={{width: '70%', height: 24, marginTop:25,  alignSelf:'center'}}
                    pinCount={4}
                    autoFocusOnLoad={true}
                    code={confirmPIN}

                    // clearInputs
                    autoFocus={true}
                    codeInputFieldStyle={{
                      width: 30,
                      height: 45,
                      borderWidth: 0,
                      marginLeft:20,
                      borderBottomWidth: 1,
                      color: show ? 'red': 'black',
                      borderColor: show ?'red': '#03DAC6'
                    }}
                    onCodeChanged={code => {
                      setconfirmPIN(code);

                      if (code.length < 5) {
                        setdisable(false)
                      }
                    }

                    }
                    secureTextEntry={true}
                    onCodeFilled={code => {
                      console.log(`Code is ${code}, you are good to go!`);
                      setconfirmPIN(code);
                      if(code.length===4){
                        setdisable(true)
                      }
                      else{
                        setdisable(false)
                      }
                    }}
                    codeInputHighlightStyle={{borderColor: show ?'red': '#03DAC6'}}
                  />

                {confirmPIN.length == 0 && submit ? <Text style={{fontSize: moderateScale(11), color:'red', fontFamily:fontFamily.Regular, position:'absolute', left:10, bottom:-30}}>{'Confirm New PIN'}</Text> : null }

                  </View>
              
              </View>

          </View>
          
      </View>


      <TouchableOpacity onPress={()=> loginCheck()} style={{  alignItems: 'center',
             justifyContent: 'center'}}>
                <View
                style={{
                  // padding:30,
                  width: '90%',
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



                <Modal isVisible={isModalVisible}>
                  

                  <View style={{ alignItems:'center', justifyContent:'flex-end', alignSelf:'center',backgroundColor:'#fff', padding:20}}>
                  {/* <TouchableOpacity onPress={toggleModal} style={{ position:'absolute', right:0, top:0}}>
                    <Image source={require('../Assets/close.png')}  style={{height: scale(20), width: scale(20)}} />
                    </TouchableOpacity> */}
                    <Text style={{fontFamily: fontFamily.Regular}}>{modelText}</Text>

                    <View style={{justifyContent:'flex-end', alignSelf:'flex-end', alignItems:'flex-end'}}>

                      <Button title="Ok" onPress={toggleModal}/>
                    </View>
                  </View>
                </Modal>



      {/* <View style={{flex:0.6,top: width * 0.2, alignSelf:'center'}}>
        <TouchableWithoutFeedback  onPress={()=>loginCheck()}>
          <View
            style={{
              height: height / 16,
              width: width / 4,
              backgroundColor: '#0EA1D8',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            //   opacity: disable ?1: 0.3
            }}>
            <Text style={{color: 'white'}}>SUBMIT</Text>
          </View>
          </TouchableWithoutFeedback>
      </View> */}
    </View>

      </SafeAreaView>  
    );  
  }  
  export default ChangePin;

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
      fontFamily:fontFamily.Bold,
      fontWeight:'600'
    },
  });