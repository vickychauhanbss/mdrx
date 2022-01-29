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
    //   Button,
    Platform,
    TouchableWithoutFeedback,
    SafeAreaView
  } from 'react-native';
  import Styles from '../../Components/Styles';
  import {AuthContext} from '../../Utils/AuthContext';
  const {height, width} = Dimensions.get('window');
  import Ionic from 'react-native-vector-icons/Ionicons';
  import {fontFamily} from '../../Utils/fonts';
  import { RecentlyDeletedAction } from '../../Service/RecordType';
  import { moderateScale, scale } from 'react-native-size-matters';
  import moment from 'moment';

  function RecentlyDeleted({ navigation }) {
    const {user, token} = useContext(AuthContext);
    const refRBSheet = useRef();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [filename, setfileName] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState([]);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(toggleFilter);





    const GetReport =()=>{
        RecentlyDeletedAction().then(res=>{
            if(res.status==200){
                console.warn('res', res.status)
                console.warn('res00', res.data)
                setName(res.data)
                // alert('hi')
            }
           
        })
    };
    


useEffect(() => {
  GetReport()
    
}, [])


    {
      const Item = ({title, index}) => (
        <View
          style={{
            flexDirection: 'row',
            padding: 2,
            // margin: 5,
            flex: 1,
            justifyContent: 'center',
            //   backgroundColor: 'red',
          }}>
          <View style={styles.item}>
            <Image source={require('../../Assets/file.jpeg')}  style={{height: scale(30), width: scale(30), alignSelf:'center'}} />

            <View
              style={{flex: 0.5, justifyContent: 'center', alignSelf: 'center', left:7}}>
              <Text
                style={
                  (styles.title,
                  {fontFamily: fontFamily.Bold, fontSize: moderateScale(14)})
                }>
                {title.record_name}
              </Text>
              <Text
                style={
                  (styles.title,
                  {
                    // color: '#AABEC6',
                    fontSize:  moderateScale(14),
                    fontFamily: fontFamily.Regular,
                  })
                }>
                {title.record_type}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={
                  (styles.title,
                  {
                    // color: '#AABEC6',
                    fontSize:  moderateScale(14),
                    fontFamily: fontFamily.Regular,
                  })
                }>
                  {moment(title.deleted_on).format('Do MMM, YYYY')}
              </Text>
              
            </View>
          </View>
        </View>
      );
    //   const toggleSort = () => {
    //     setToggleFilter(!toggleFilter);
    //   };
      const renderItem = ({item}) => <Item title={item} />;
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
            <View style={styles.record}>
              
              <Text style={{fontSize: moderateScale(18), fontFamily:fontFamily.Bold}}>Recently Deleted</Text>
              
            </View>
            {name.length > 0 ? (
              <FlatList
                data={name}
                renderItem={renderItem}
                keyExtractor={item => item.index}
              />
            ) : (
              <Text style={{textAlign: 'center', top: 20}}>No Record Found </Text>
            )}
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
  export default React.memo(RecentlyDeleted);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    record: {
      marginTop:10,
      alignSelf:'center',
      justifyContent:'center'
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
      height: width * 0.20,
      // backgroundColor: '#F7F7F7',
      // borderRadius: 5,
      // elevation: 2,
      padding: 10,

      // marginVertical: 8,
      borderBottomWidth:1,
      borderBottomColor:'#d3d3d3',
      // marginHorizontal: 8,
      flexDirection: 'row',
    },
    title: {
      fontSize: width * 0.0456,
    },
  });
  