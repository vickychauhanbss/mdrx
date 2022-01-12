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
  SafeAreaView
} from 'react-native';
import Styles from '../../Components/Styles';
import {AuthContext} from '../../Utils/AuthContext';
import {resetStore} from '../../redux/resetStore/resetAction';
import {useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');
import { fontFamily } from '../../Utils/fonts';

import { moderateScale, scale } from 'react-native-size-matters';
import Pdf from 'react-native-pdf';

export default function OpenPdfFile({navigation, route}) {

  console.log('route++++++', route);

  const { url } = route.params

  console.log('url+++++', url)

  const [visible, setVisible] = useState(false);


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
                color="red"
                size="large"
            />
        </View>
    );
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


        {/* <ScrollView  > */}
                <ScrollView style={styles.container}>

                <Pdf
                    source={{uri: url}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}

                    style={styles.pdf}
                    />

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
  container: {
    flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
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


  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});

