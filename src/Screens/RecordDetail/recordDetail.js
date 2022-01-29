import React, {
  Component,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  FlatList,
  SafeAreaView,
  //   Button,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Styles from '../../Components/Styles';
import {AuthContext} from '../../Utils/AuthContext';
const {height, width} = Dimensions.get('window');
// import CheckBox from '@react-native-community/checkbox';
// import {CheckBox} from 'react-native-elements';
// import Material from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import {fontFamily} from '../../Utils/fonts';
import {Alert} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

function RecordDetail({
  navigation,
  getAllReport,
  fileGetSuccess,
  route,
  DeleteReport,
  reportDeleteMsgRead,
  DeleteSuccess,
  DeleteFail,
  Report,
  getReportFail,
  getReportSuccess,
  getReportMsgRead,

}) {
  const {user, token} = useContext(AuthContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(toggleFilter);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [checkBoxIndex, setCheckBoxIndex] = useState('');

  
  //   useEffect () => {
  //       getAllReport()
  //   };
  


 const handleAllChecked = (event) => {
   console.log('event++++++', event);
   setToggleCheckBox(toggleCheckBox ? false : true)
    let fruites = [...name];

    const newData = fruites.map(item => {
      // if (item.slug === itemSelected.slug) {
        return {
          ...item,
          isChecked: toggleCheckBox ? false : true
        };
      })
    setName([...newData])
  }



  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = name.filter(
        function (item) {
          const itemData = item.record_name
            ? item.record_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      console.warn('SearchData',newData)
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(name);
      setSearch(text);
    }
  };
  useEffect(() => {
    getAllReport();
    // console.log('========>>>>>', route);
  }, [getAllReport]);
  useEffect(() => {
    if (getReportSuccess) {
      setName(fileGetSuccess);
      console.warn('fileGetSuccess', fileGetSuccess);
      // Toast.show('Report Fetched Succesfully', Toast.SHORT, [
      //   'UIAlertController',
      // ]);
     
    
      getReportMsgRead();
    } else if (getReportFail) {
      Toast.show('Your record cannot be retrieved due to some issue. Please try again.', Toast.SHORT, [
        'UIAlertController',
      ]);
      getReportMsgRead();
    }
    return () => {};
  }, [getReportSuccess, getReportFail, fileGetSuccess, getReportMsgRead]);
  // useLayoutEffect(() => {
  //   if (fileGetSuccess.length > 0) {
     
  //     setName(fileGetSuccess);
  //     // setProfileImage(getProfileData.imageURL)
  //   }
  // }, [fileGetSuccess]);

  const Share = () => {
      const listSelected = name.filter(item => item.isChecked === true);
      let content = '';
      listSelected.forEach(item => {
      content = content + item.slug + ',';
        //
    });
    if (content === '') {
      alert ('Select record which you want to share')
       }
       else{
      navigation.navigate('Share', {shared_list: content})
       }
    };
  

  const CheckBoxstate = () => {
    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(true);
    }
  };
  const sort = () => {
    // const sortedActivities = name.sort((a, b) => a.date_record - b.date_record)
    var sorted_meetings = name
      .sort((a, b) => {
        return (
          new Date(b.date_record).getTime() - new Date(a.date_record).getTime()
        );
      })
      .reverse();
    setName(sorted_meetings);
    console.log('Sorted data', sorted_meetings);
  };
  useEffect(() => {
    setToggleFilter(false);
  }, []);

  const sortedArray = useMemo(() => {
    return toggleFilter
      ? [...name]
          .sort(
            (a, b) =>
              new Date(b.date_record).getTime() -
              new Date(a.date_record).getTime(),
          )
          .reverse()
      : name;
  }, [name, toggleFilter]);


  const showAlert = (data) => {
    Alert.alert(  
        'Delete record',
        'Do you want to delete record?',  
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
  
  const handleCheckBox = (itemSelected) => {
    const newData = name.map(item => {
      if (item.slug === itemSelected.slug) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return {
        ...item,
        isChecked: item.isChecked,
      };
    });
    setName(newData);
    console.log('to check data', newData);
  };

  
  useEffect(() => {
    if (DeleteSuccess) {
      getAllReport();
      Toast.show('Record has been deleted successfully', Toast.SHORT, [
        'UIAlertController',
      ]);
      setName(fileGetSuccess);
    
      reportDeleteMsgRead();
    } else if (DeleteFail) {
      Toast.show('Record cannot be deleted due to some error.Please try again', Toast.SHORT, [
        'UIAlertController',
      ]);
      reportDeleteMsgRead();
    }
    return () => {};
  });

  const toggleCheckbox = id => {
    let changedCheckbox = name.find(cb => cb.slug === id);
    changedCheckbox._checked = !changedCheckbox._checked;
    let chkboxes = name;
    for (let i = 0; i < chkboxes.length; i++) {
      if (chkboxes[i].slug === id) {
        chkboxes.splice(i, 1, changedCheckbox);
      }
    }
    console.warn(chkboxes);
    // this.setState({checkboxes: chkboxes});
    setName(chkboxes);
  };
  const onPressShow = () => {
    const listSelected = name.filter(item => item.isChecked === true);
    let content = '';
    listSelected.forEach(item => {
      content = content + item.slug + ',' ;
      //
    });
    if (content === '') {
      alert ('Select record which you want to delete ')
    }else{
    const data = new FormData();
    data.append('record_list', content);
    // Alert.alert(content);
    showAlert(data)
   
   }
   
  };


  const deleteRecord = (item) => {
    const data = new FormData();
    data.append('record_list', item.slug);
    // Alert.alert(content);
    showAlert(data)

};


const ShareRecord = (item) => {
  console.log('slug++++++', item.slug);
  navigation.navigate('Share', {shared_list: item.slug})

}

const changeIndex = (index) => {
  setCheckBoxIndex(index)
}

const renderItem = ({ item, index }) => (
  <Item description={item.description} title={item.title} index={index} />
);




  {
    const Item = ({title, index}) => (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate('EditRecord', {
        //     slug: title.slug,
        //   })
        // }
        style={{
          // padding: 2,
          // margin: 2,
          // flex: 1,
          alignItems:'center',
          //   backgroundColor: 'red',
          marginTop:20,

   
          flexDirection: 'row',
          // padding: 5,
          // margin:5,
          flex: 1,
          justifyContent:'center',
          // elevation:3,
          marginBottom: 10,

          
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
            shadowOpacity: 0.23,
            shadowRadius: 4.65,

            elevation: 2,
            
        }}>
          
       

      <View style={styles.item}>
        {/* <Text>{index}</Text> */}
        <TouchableOpacity onPress={() => handleCheckBox(title) }>
          <Image source={title.isChecked ? require('../../Assets/images/check.png') : require('../../Assets/images/empty.png')  }  style={{height: title.isChecked ? scale(20) : scale(20), width:scale(20)}} />
        </TouchableOpacity>


        {/* <CheckBox
          disabled={false}
          onAnimationType="fill"
          offAnimationType="fade"
          style={{width:25, height:25, marginRight:10, alignItems:'center'}}
          // value={title.CheckBox ?true : false }
          value={title.isChecked}
          // onChange={toggleCheckbox(title.slug)}

          onValueChange={() => handleCheckBox(title)}
        /> */}


          <TouchableOpacity  onPress={() =>
              navigation.navigate('viewRecords', {
                slug: title.slug,
              })
            } style={styles.innerItem}>

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

            <View style={{width:"100%",  justifyContent:'center', alignSelf:'center',left:5}}>
              <Text style={styles.title, {fontFamily:fontFamily.Bold, fontSize: moderateScale(13)}}>{title.record_name}</Text>
              <Text style={styles.title, { fontFamily:fontFamily.Regular, fontSize: moderateScale(11)}}>{title.record_type_name}</Text>
              
            </View>
           
            </TouchableOpacity>



            <View style={{ flex:0.50, height:'100%', marginTop:'6%', zIndex:999999}}>
              <MenuProvider style={{position:'absolute', right:0}}>
              <Menu  >
                <MenuTrigger  >
                  <Image  source={require('../../Assets/dots.png')}  style={{height: scale(20), width: scale(20)}} />  
                </MenuTrigger>
                
                <MenuOptions>
                  <MenuOption onSelect={() => ShareRecord(title)}   style={{marginLeft:'3%'}} >
                    <Text style={{color: 'green', fontSize: 14, fontFamily: fontFamily.Regular,}}>Share</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => deleteRecord(title)}  style={{marginLeft:'3%'}} >
                    <Text style={{color: 'red', fontSize: 14, fontFamily: fontFamily.Regular}}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
              </MenuProvider>

            </View>

            
            <View style={{ position:'absolute', right:'4%', bottom:20}}>
                <Text style={styles.title,{fontFamily:fontFamily.Regular, fontSize: moderateScale(12)}}>{title.files_num}{title.files_num > 1 ? ' Files' : 'File'} {',' + title.total_size}</Text>
                {/* <Text style={styles.title,{fontFamily:fontFamily.Regular, fontSize: moderateScale(12)}}>{title.total_size}</Text> */}
            </View>

        </View>
      </TouchableOpacity>
    );



    
    const toggleSort = () => {
      setToggleFilter(!toggleFilter);
    };
    const renderItem = ({item, index}) => <Item title={item} index={index}  />;
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

        <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Quick Search"
        />
          <View style={styles.record}>
            <View style={{flex: 1}}>
              
              <View style={{flexDirection: 'row' }}>


              <TouchableOpacity onPress={() => handleAllChecked() } style={{position:'absolute', left:'1%'}}>
                <Image source={toggleCheckBox ? require('../../Assets/images/check.png') : require('../../Assets/images/empty.png')  }  style={{height: toggleCheckBox ? scale(20) : scale(20), width: scale(20)}} />
              </TouchableOpacity>
              {/* <CheckBox
                  // style={{flex: 1, padding: 10}}
                  onClick={(newValue)=>handleAllChecked(newValue)}
                  isChecked={toggleCheckBox}
                  // leftText={"CheckBox"}
              /> */}


                {/* <CheckBox
                 disabled={false}
                 onAnimationType="fill"
                 offAnimationType="fade"
                 style={{width:25, height:25, marginRight:8, marginLeft:5, alignItems:'center'}}

                  value={toggleCheckBox}
                  onValueChange={newValue => handleAllChecked(newValue)}
                /> */}
              </View>

            </View>
    
            <View
              style={{
                flexDirection: 'row',
                flex: 0.3,
                alignContent: 'stretch',
                // left: 20,
                justifyContent: 'space-around',
              }}>


            <TouchableOpacity onPress={Share}>
              <Image  source={require('../../Assets/reply.png')}  style={{height: scale(20), width: scale(20)}} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => onPressShow()}>
              <Image  source={require('../../Assets/delete.png')}  style={{height: scale(22), width: scale(22)}} />
            </TouchableOpacity>


        
              {/* <Icon name={'share'} size={25} color={'#0EA1D8'}  onPress={Share} />
              <Icon name={'trash'} size={25} color={'#0EA1D8'} onPress={() => onPressShow()} /> */}
              {/* <AntIcon name="sharealt" size={25} />

              <AntIcon name="delete" size={25} onPress={() => onPressShow()} /> */}
            </View>
          </View>

         
          {name.length > 0 ? (
            <FlatList
              data={name}
              renderItem={renderItem}
              extraData={name}
              keyExtractor={item => item.index}
            />
          ) : (
            <Text style={{textAlign: 'center', top: 20}}>No Record exists for you. </Text>
          )}
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default React.memo(RecordDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'5%'
  },
  record: {
    flexDirection: 'row',
    padding: 6,
    margin: 5,
    marginStart:10
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
    // flex: 1,
    // width: width * 0.8,
    // height: width * 0.13,
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    elevation: 3,
    padding: 5,
    // marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems:'center'
  },


  


  innerItem: {
    flex: 1,
    // width: width * 0.8,
    // height: width * 0.13,
    backgroundColor: '#F7F7F7',
    // width: '100%',
    // borderRadius: 5,
    // elevation: 3,
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flexDirection: 'row',
    alignItems:'center',
    position:'relative'
  },
  title: {
    fontSize: width * 0.0456,
  },
  textInputStyle: {
    height: 40,
    width:width -20,
    borderWidth: 0.5,
    paddingLeft: 20,
    margin: 5,
    borderRadius:50,
    borderColor: '#0EA1D8',
    backgroundColor: '#FFFFFF',
    alignSelf:'center',
    marginTop:10
  },
  menuOptions: {
    // padding: 10,
    // marginTop:100
  },
});
