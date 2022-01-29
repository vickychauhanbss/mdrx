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
  Platform,
  SafeAreaView
} from 'react-native';
import Styles from '../../Components/Styles';
import {AuthContext} from '../../Utils/AuthContext';
import {resetStore} from '../../redux/resetStore/resetAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
// import AntIcon from 'react-native-vector-icons/AntDesign';
import { fontFamily } from '../../Utils/fonts';
import { not } from 'react-native-reanimated';
import { AddNoteAction } from './AddNoteAction';
// import LinearGradient from 'react-native-linear-gradient';

import { moderateScale, scale } from 'react-native-size-matters';


export default function AddNotes({navigation, route}) {
  const {user, token} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
  const {setLogout} = useContext(AuthContext);
  const refRBSheet = useRef();
  const [filePath, setFilePath] = useState({});
  const [note , setnote]=useState('');
  const dispatch = useDispatch();
  {




    const AddComment = () => {
        if (note === '') {
          alert('Please add your notes or press back button');
        } else {
          var form = new FormData();
          form.append('user_comment', note);
  
          AddNoteAction(route.params.slug,form).then(response => {
            console.log('response123456', response.status);
            if (response.status === 200) {
              navigation.navigate(route.params.screen),
              Toast.show('Note Added', Toast.LONG);
            }
            else {
            //   showAlert();
              Toast.show('Notes Failed', Toast.LONG);
            }
          });
        }
      };
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
                    style={{height: 28, width: 28, borderRadius: 30 / 2,backgroundColor:'#000'}}
                  />
              </View>
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
                    source={require('../../Assets/menu.png')}
                    style={{height: scale(30), width: scale(25)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
        </View>

        <View style={{marginTop: width * 0.07, padding:10, margin:10, borderWidth: 0.5, borderColor:'gray', marginHorizontal:20, borderRadius:20}}>
              <TextInput
                placeholder={'Add Notes....'}
                value={note}
                textAlignVertical={'top'}
                onChangeText={text => {
                  setnote(text);
                }}
                multiline={true}
                style={{
                  // borderBottomColor: 'black',
                  backgroundColor: '#fff',
                  // borderWidth: 1,
                  fontSize: 15,
                  height: width * 0.3,
                  borderRadius:15,
                  // opacity:1,
                  // elevation:5,
                  padding:20,
                  paddingTop:10,
                  fontFamily:fontFamily.SemiBold,
                  color: '#3598f7',
                  // multiline={true}
                }}
              />
            </View>

            <TouchableOpacity onPress={()=> AddComment()} style={{  alignItems: 'center',
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
                    SAVE
                    </Text>
                  {/* </LinearGradient> */}


                {/* <Text style={{color: '#fff', fontFamily:fontFamily.Bold}}>
                  SUBMIT
                </Text> */}
              </View>
                </TouchableOpacity>
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
    fontFamily:fontFamily.Bold,
    fontWeight:'600'
  },
});
