import React, {useEffect} from 'react';
import {View, AppState} from 'react-native';
import {Provider} from 'react-redux';
// import {useNetInfo} from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store/store';
// import { ThemeContextProvider } from './Component/patientModule/core/themeProvider';
import AuthContextProvider from './src/Utils/AuthContext';
// import { Style } from './Component/patientModule/styles/Style';
import {Loader} from './src/Utils/Network';
import RootNavigation from './src/Routes/index';
import ExistingUser from './src/Screens/ExistingUser'
import ProfileContextProvider from './src/Utils/ProfileContext';
import { removeItem } from './src/Utils/StorageService';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from './src/apis';   //needs to be 
// import Toast from 'react-native-toast-message';

// import OfflineNotice from './Component/patientModule/commonComponents/OfflineNotice';
// import { navigationRef } from './navigation/RootNavigationService';
// import { appStateChangeHandler } from './QuickBlox/video/QBVideo';
// const allowInDevMode = true;
const App = () => {
  // const netInfo = useNetInfo();

  useEffect(() => {
    SplashScreen.hide();

    return () => {
      // AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);
  useEffect(()=>{
    removeItem('token')
    },[])
  
  return (
   
    <Provider store={store}>
      <AuthContextProvider>
        <ProfileContextProvider>
          {/* <ThemeContextProvider> */}

          <StripeProvider publishableKey={PUBLISHABLE_KEY}   merchantIdentifier="merchant.identifier">
            <NavigationContainer>
              {/* <View style={Style.mainContainer}> */}
              {/* {netInfo.isConnected ? null : <OfflineNotice />} */}
              <Loader />
              {/* <Toast /> */}
              <RootNavigation />
          
              {/* </View> */}
            </NavigationContainer>
          </StripeProvider>
          {/* </ThemeContextProvider> */}
        </ProfileContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};
export default App;

// export default class App extends Component {
//   componentDidMount() {
//     // do stuff while splash screen is shown
//     // After having done stuff (such as async tasks) hide the splash screen
//     SplashScreen.hide();
//   }
//   render() {
//     return <StackNavigator />;
//   }
// }
