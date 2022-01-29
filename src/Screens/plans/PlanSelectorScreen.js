import React, {
    Component,
    useContext,
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } from 'react';
import { View, Text, TouchableOpacity, Button , Image, Dimensions, SafeAreaView, ScrollView, Platform} from 'react-native'
import { Card } from 'react-native-elements'
import { moderateScale, scale } from 'react-native-size-matters';
import {AuthContext} from '../../Utils/AuthContext';
import { fontFamily } from '../../Utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tab, TabView } from 'react-native-elements';


const PlanSelectorScreen = ({ route, navigation }) => {
    const {user, token} = useContext(AuthContext);
    const {height, width} = Dimensions.get('window');
    const [index, setIndex] = React.useState(0);

    const { subscribedTo } = route.params

    return (
        // <>
            // {
            // subscribedTo === 'Free' && 
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} >

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


              {/* <ScrollView> */}

              {/* <View style={{flex: 1, backgroundColor: '#fff'}} > */}
              <Tab value={index} onChange={setIndex}  variant="primary"   indicatorStyle={{
                  backgroundColor: 'black',
                  height: 3,
                }}>
                <Tab.Item title="Basic"  style={{
                    backgroundColor: '#0EA1D8',
                    color:'#ffff'

                }}/>
                <Tab.Item title="Advanced"  style={{
                    backgroundColor: '#0EA1D8',
                    color:'#ffff'

                }}/>
              </Tab>

              <TabView value={index} onChange={setIndex} >
                <TabView.Item style={{ width: '100%', marginHorizontal:20 }}>
                  <View>
                  <Text style={{color:'#000', marginTop:20, fontSize: moderateScale(16), fontFamily: fontFamily.Bold}} h1>Storage upto 512 MB</Text>
                  
                  <View style={{ backgroundColor:'#eff6fc', marginTop:'10%', marginRight:'10%', padding:15}}> 


                  <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 

                    <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}> 
                    View your medical records including DICOM images like MRI's/XRAY etc.</Text>
                  </View>




                  <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>                    
                  Store your medical records including Reports/Images/Genomics etc.</Text>
                    </View>




                    <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>
                    
                    Securely share your medical records.</Text>
                    </View>


                    <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000',  fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>
                    
                    Add Notes</Text>
                    </View>
                
                  </View>


                  <TouchableOpacity
                   style={{top: width * 0.1, alignContent:'center', alignItems:'center', alignSelf:'center', width:'90%', marginTop:'25%', marginRight:'10%'}} onPress={() => navigation.navigate('CardDetails', {
                    planType: 'Basic',
                    durationType: 'Annual'
                })}>
                   <View
                     style={{
                       height: 47,
                       width:'100%',
                       // width: 143,
                       backgroundColor: '#0EA1D8',
                       justifyContent: 'center',
                       alignItems: 'center',
                       borderRadius: 10,
                       // elevation:4,
                       // bottom :20,
                       // shadowColor:'#F0F4F5'
                     }}>
                     <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Regular, fontSize: moderateScale(16)}}>
                       $1.67/Month when billed Annually
                     </Text>
                   </View>
                 </TouchableOpacity>


                 <TouchableOpacity
                  
                  style={{top: width * 0.1, alignContent:'center', alignItems:'center', alignSelf:'center', width:'90%', marginTop:'5%',marginRight:'10%'}}   onPress={() => navigation.navigate('CardDetails', {
                    planType: 'Basic',
                    durationType: 'Monthly'
                })}>
                  <View
                    style={{
                      height: 47,
                      width:'100%',
                      // width: 143,
                      borderColor: '#0EA1D8',
                      borderWidth:1,
                      // backgroundColor: '#0EA1D8',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      // elevation:4,
                      // bottom :20,
                      // shadowColor:'#F0F4F5'
                    }}>
                    <Text style={{color: '#0EA1D8', fontFamily: fontFamily.Regular, fontSize: moderateScale(16)}}>
                    $1.99/Month when billed Monthly
                    </Text>
                  </View>
                </TouchableOpacity>
                  {/* <Text h1>Recent</Text> */}
                  </View>
                </TabView.Item>
                <TabView.Item style={{ width: '100%', marginHorizontal:20 }}>
                <View>

                <Text style={{color:'#000', marginTop:20, fontSize: moderateScale(16), fontFamily: fontFamily.Bold}}>Storage upto 8 GB</Text>


                   
                <View style={{ backgroundColor:'#eff6fc', marginTop:'10%', marginRight:'10%', padding:15}}> 


               
                <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 

                    <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}> 
                    View your medical records including DICOM images like MRI's/XRAY etc.</Text>
                  </View>




                  <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>                    
                  Store your medical records including Reports/Images/Genomics etc.</Text>
                    </View>




                    <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000', fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>
                    
                    Securely share your medical records.</Text>
                    </View>


                    <View style={{flexDirection:'row', marginTop:'5%'}}> 
                  <Image source={require('../../Assets/dots1.png')} style={{height: scale(10),width:scale(10), marginRight:10, marginTop:5}} /> 
                  <Text style={{color:'#000',  fontSize: moderateScale(16), fontFamily: fontFamily.Regular}}>
                    
                    Add Notes</Text>
                    </View>




                </View>


                <TouchableOpacity
                style={{top: width * 0.1, alignContent:'center', alignItems:'center', alignSelf:'center', width:'90%', marginTop:'25%', marginRight:'10%'}} onPress={() => navigation.navigate('CardDetails', {
                  planType: 'Advanced',
                  durationType: 'Annual'
              })}>
                <View
                  style={{
                    height: 47,
                    width:'100%',
                    // width: 143,
                    backgroundColor: '#0EA1D8',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    // elevation:4,
                    // bottom :20,
                    // shadowColor:'#F0F4F5'
                  }}>
                  <Text style={{color: '#FFFFFF', fontFamily: fontFamily.Regular, fontSize: moderateScale(16)}}>
                    $3.67/Month when billed Annually
                  </Text>
                </View>
                </TouchableOpacity>


                <TouchableOpacity

                style={{top: width * 0.1, alignContent:'center', alignItems:'center', alignSelf:'center', width:'90%', marginTop:'5%',marginRight:'10%'}}  onPress={() => navigation.navigate('CardDetails', {
                  planType: 'Advanced',
                  durationType: 'Monthly'
              })}>
                <View
                  style={{
                    height: 47,
                    width:'100%',
                    // width: 143,
                    borderColor: '#0EA1D8',
                    borderWidth:1,
                    // backgroundColor: '#0EA1D8',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    // elevation:4,
                    // bottom :20,
                    // shadowColor:'#F0F4F5'
                  }}>
                  <Text style={{color: '#0EA1D8', fontFamily: fontFamily.Regular, fontSize: moderateScale(16)}}>
                  $3.99/Month when billed Monthly
                  </Text>
                </View>
                </TouchableOpacity>



                </View>

                </TabView.Item>
              
              </TabView>
              {/* </View> */}


            {/* </ScrollView> */}
          </SafeAreaView>
        // </>
    )
}

export default PlanSelectorScreen
