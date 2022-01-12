// In App.js in a new project

import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PaymentPlan from '../Screens/PaymentPlan/PaymentPlan'
import Signup from '../Screens/Signup';
import Home from '../Screens/HomeContainer';
import Search from '../Screens/Search';
import Edit from '../Screens/Profile/ProfileContainer';
import AuthContextProvider, {AuthContext} from '../Utils/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import Login1 from '../Screens/Login1';
import SidePanel from '../Screens/SidePanel';
import otp from '../Screens/otpScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddRecord from '../Screens/addRecordContainer';
import recordDetail from '../Screens/RecordDetail/recordDetailContainer';
import EditRecord from '../Screens/EditRecord/EditRecordContainer';
import ExistingUser from '../Screens/ExistingUser';
import AddProfile from '../Screens/Profile/ProfileContainer';
import ForgetPin from '../Screens/ForgetPin';
import ChangePin from '../Screens/changePin';
import Setting from '../Screens/Setting';
import recentlyDeleted from '../Screens/recentlyDeleted/recentlyDeleted';
import ShareRecord from '../Screens/ShareReacord/shareRecord';
import AddNotes from '../Screens/Add Notes/AddNotes';
import CheckoutScreen from '../Screens/PaymentPlan/CheckoutScreen';
import OpenUrl from '../Screens/openUrl';
import openBillings from '../Screens/billingContainer';

import ContactUs from '../Screens/contactus/contactUsContainer';

import viewRecords from '../Screens/EditRecord/ViewRecordContainer';
import PlanSelectorScreen from '../Screens/plans/PlanSelectorScreen';
import CardDetails  from '../Screens/plans/CardDetails';
import OpenFileUrl from '../Screens/EditRecord/openFile';
import OpenPdfFile from '../Screens/EditRecord/openPdf';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const {height, width} = Dimensions.get('window');
const HomeStack = createStackNavigator();
const ExistingUserStack = createStackNavigator();
const PaymentStack= createStackNavigator();
const homeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={({route}) => ({
      headerBackTitle: ' ',
      gestureEnabled: false,
      headerShown: false,
      headerTransparent: true,
      // headerTitleStyle: Style.navigationHeaderTitle,
      // headerStyle: {
      //   opacity: route.params ? route.params.opacity : 1,
      // },
    })}>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Dashboard"
      route="Dashboard"
      component={Home}
    />
    <HomeStack.Screen
      name="AddRecord"
      component={AddRecord}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="RecordDetail"
      component={recordDetail}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="EditRecord"
      component={EditRecord}
      options={{headerShown: false}}
    />


    <HomeStack.Screen
      name="viewRecords"
      component={viewRecords}
      options={{headerShown: false}}
    />


     <HomeStack.Screen
      name="AddProfile"
      component={AddProfile}
      options={{headerShown: false}}
    />
     <HomeStack.Screen
      options={{headerShown: false}}
      name='ChangePIN'
      route='ChangePIN'
      component={ChangePin}
    />
     <HomeStack.Screen
      options={{headerShown: false}}
      name='Setting'
      route='Setting'
      component={Setting}
    />


    <HomeStack.Screen
      options={{headerShown: false}}
      name='OpenUrl'
      route='OpenUrl'
      component={OpenUrl}
    />


    <HomeStack.Screen
      options={{headerShown: false}}
      name='OpenFileUrl'
      route='OpenFileUrl'
      component={OpenFileUrl}
    />


    <HomeStack.Screen
      options={{headerShown: false}}
      name='OpenPdfFile'
      route='OpenPdfFile'
      component={OpenPdfFile}
    />







    <HomeStack.Screen
      options={{headerShown: false}}
      name='openBillings'
      route='openBillings'
      component={openBillings}
    />


<HomeStack.Screen
      options={{headerShown: false}}
      name='ContactUs'
      route='ContactUs'
      component={ContactUs}
    />




<HomeStack.Screen
      options={{headerShown: false}}
      name='PlanSelectorScreen'
      route='PlanSelectorScreen'
      component={PlanSelectorScreen}
    />

<HomeStack.Screen
      options={{headerShown: false}}
      name='CardDetails'
      route='CardDetails'
      component={CardDetails}
    />






     <HomeStack.Screen
      options={{headerShown: false}}
      name='RecentlyDeleted'
      route='RecentlyDeleted'
      component={recentlyDeleted}
    />
    <HomeStack.Screen
      options={{headerShown: false}}
      name='Share'
      route='Share'
      component={ShareRecord}
    />
     <HomeStack.Screen
      options={{headerShown: false}}
      name='AddNotes'
      route='AddNotes'
      component={AddNotes}
    />
  </HomeStack.Navigator>
);

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function Drawer1() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      // drawerType={width ? 'permanent' : 'back'}
      drawerStyle={width ? null : {width: width}}
      drawerContent={props => <SidePanel {...props} />}>
      <Drawer.Screen name="Home"  component={homeNavigator}
 />
    </Drawer.Navigator>
  );
}

function Tab1() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Edit') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search1' : 'search1';
          } else if (route.name === 'Documents') {
            iconName = focused ? 'file-document' : 'file-document-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'dots-horizontal' : 'dots-horizontal';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        color: 'black',
        activeTintColor: '#FFFFFF',
        // inactiveTintColor: '#12D5DB', // Color of tab when not pressed
        showIcon: 'true', // Shows an icon for both iOS and Android
        labelStyle: {
          fontSize: 11,
          color: 'black',
        },
        style: {
          // borderColor: '#12D5DB',
          backgroundColor: '#0EA1D8',
          opacity: 0,
          elevation: 4,
          // borderTopWidth:2,
          // borderRightWidth:2,
          // borderLeftWidth:2,
        },
      }}> 

      
      <Tab.Screen
        name="Home"
        component={homeNavigator}
        listeners={({navigation, route}) => ({
          tabPress: () => {
            if (route && route.state && route.state.index != 0) {
              navigation.reset({
                index: 0,
                key: null,
                routes: [{name: 'Home'}],
              });
              navigation.navigate('Home');
            }
          },
        })}/>


      <Tab.Screen name="Edit" component={Edit} />
    </Tab.Navigator>
  );
}
const ExistingNavigator= () => (
  <ExistingUserStack.Navigator
    screenOptions={({route}) => ({
      headerBackTitle: ' ',
      gestureEnabled: false,
      headerShown: false,
      headerTransparent: true,
      // headerTitleStyle: Style.navigationHeaderTitle,
      // headerStyle: {
      //   opacity: route.params ? route.params.opacity : 1,
      // },
    })}>
         <ExistingUserStack.Screen
        options={{headerShown: false}}
        name="ExistingUser"
        component={ExistingUser}
      />
      <ExistingUserStack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />

      <ExistingUserStack.Screen
        options={{headerShown: false}}
        name="Login1"
        component={Login1}
      />
      <ExistingUserStack.Screen
        options={{headerShown: false}}
        name="OTPScreen"
        component={otp}
      />
      <ExistingUserStack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0EA1D8',
          },
        }}
        name="ForgetPin"
        component={ForgetPin}
      />
  </ExistingUserStack.Navigator>
);
const PaymentNavigator= () => (
  <PaymentStack.Navigator
    screenOptions={({route}) => ({
      headerBackTitle: ' ',
      gestureEnabled: false,
      headerShown: false,
      headerTransparent: true,
      // headerTitleStyle: Style.navigationHeaderTitle,
      // headerStyle: {
      //   opacity: route.params ? route.params.opacity : 1,
      // },
    })}>
         <PaymentStack.Screen
        options={{headerShown: false}}
        name="PaymentPlan"
        component={PaymentPlan}
      />
      <PaymentStack.Screen
        options={{headerShown: false}}
        name="Checkout"
        component={CheckoutScreen}
      />

     
  </PaymentStack.Navigator>
);
const RootNavigation = ({navigation}) => {
  const {user, token} = React.useContext(AuthContext);
  {console.warn('check',token)}
  // return user && token ? (
  if (token) {
    if (user.pro_member) {
      return <Drawer1 />;
    }
    else{
      return <PaymentNavigator/>

  
      
    }
  } 
  else{
  return (
    <Stack.Navigator initialRouteName="ExistingUser">
      
         <Stack.Screen
        options={{headerShown: false}}
        name="ExistingUser"
        component={ExistingUser}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Login1"
        component={Login1}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OTPScreen"
        component={otp}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0EA1D8',
          },
        }}
        name="ForgetPin"
        component={ForgetPin}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="LoginMemberScreen"
        component={LoginMemberScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="LoginMemberScreen"
        component={LoginMemberScreen}
      /> */}
    </Stack.Navigator>
  );
    }
};
// export default RootNavigation;

// function StackNavigator() {
//   const {user, token} = React.useContext(AuthContext);
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name= 'Signup'
//         component={Signup}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Login1"
//         component={Login1}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen name="otp" component={otp} options={{headerShown: false}} />

//       <Stack.Screen
//         name="Home"
//         component={Tab1}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="SidePanel"
//         component={SidePanel}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// }

export default RootNavigation;
