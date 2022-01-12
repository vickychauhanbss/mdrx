import React, {useContext} from 'react';
import axios from 'axios';

import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';
// import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-simple-toast';
import {AuthContext} from './AuthContext';
import {MED_API, REFRESH_TOKEN} from './apiConfig';
// import {TIME_OUT_MILLS} from './constant';
const {width, height} = Dimensions.get('window');

const {useState, useCallback, useMemo, useEffect} = React;

const ax = axios.create(); // export this and use it in all your components

// ax.defaults.timeout = 10000; //Set request timeout

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the Auth refresh complete
let subscribers = [];

function onAccessTokenFetched(access_token) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  console.log(' New Token' + access_token);
  subscribers.forEach((callback) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

const useAxiosLoader = () => {
  const {token, setToken, setLogout} = useContext(AuthContext);
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter((counterVal) => counterVal + 1), [
    setCounter,
  ]); // add to counter
  const dec = useCallback(() => setCounter((counterVal) => counterVal - 1), [
    setCounter,
  ]); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config) => {
        if (!config.loaderHide) {
          inc();
        }
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Token ${token}`,
          };
        }
        console.log('apiConnect', JSON.stringify(config));
        return config;
      },
      response: response => {
        dec();
        console.log('apiConnect', JSON.stringify(response));
        return response;
      },

      error: error => {
        const originalRequest = error.config;
        console.log('error++++++++++',error);
        console.log('error.response+++++++', error.response);
        try {
          const errorCo = error;
          console.log(errorCo);
          if (
            (error.response && error.response.status === 403)
          ) {
            return error;
          } else if (error.toString().indexOf('Network Error') > -1) {
            dec();
            Toast.show('Please check your Internet connection', Toast.SHORT, [
              'UIAlertController',
            ]);
            return Promise.reject({error: 'No Internet connection'});
          } else {
            dec();
            return Promise.reject({error: error});
          }
        } catch (err) {
          dec();
          console.log(err);
          // crashlytics().log(err);
        }
      },
    }),
    [inc, dec, token],
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors

    const reqInterceptor = ax.interceptors.request.use(
      interceptors.request,
      interceptors.error,
    );
    // add response interceptors
    const resInterceptor = ax.interceptors.response.use(
      interceptors.response,
      interceptors.error,
    );
    return () => {
      // remove all intercepts when done
      ax.interceptors.request.eject(reqInterceptor);
      ax.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors, token]);

  const resetTokenAndReattemptRequest = async (error) => {
    try {
      const {response: errorResponse} = error;
      const resetToken = token.refresh_token; // Your own mechanism to get the refresh token to refresh the Auth token
      if (!resetToken) {
        // We can't refresh, throw the error anyway
        return Promise.reject(error);
      }

      const retryOriginalRequest = new Promise((resolve) => {
        dec();
        addSubscriber((access_token) => {
          errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
          console.log(' New Token with old req ' + access_token);
          resolve(axios(errorResponse.config));
        });
      });
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        let requestParamas = `?grant_type=refresh_token&refresh_token=${token.refresh_token}`;

        const config = {
          headers: {
            Authorization: 'Basic dmxpbms6dmxpbms=',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        console.log(requestParamas);
        const response = await axios.post(
          LEARNING_API.BASE_URL + REFRESH_TOKEN + requestParamas,
          null,
          config,
        );

        if (!response.data) {
          setLogout(true);
          Toast.show('Your Session has expired', Toast.SHORT, [
            'UIAlertController',
          ]);
          return Promise.reject(error);
        }
        const {
          access_token,
          token_type,
          refresh_token,
          scope,
          expires_in,
        } = response.data;
        let newToken = {
          access_token: access_token,
          token_type: token_type,
          refresh_token: refresh_token,
          scope: scope,
          expires_in: expires_in,
        };
        console.log(newToken);
        setToken(newToken);
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(newToken.access_token);
      }
      return retryOriginalRequest;
    } catch (err) {
      console.log('apiConnect token error ', err);
      console.log('apiConnect token error ', err.response);
      setLogout(true);
      Toast.show('Your Session has expired', Toast.SHORT, [
        'UIAlertController',
      ]);
      return Promise.reject(err);
    }
  };
  return [counter > 0];
};

const LoaderView = (props) => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={'#0EA1D8'}
            animating={loading} />
          {/* <Image
            source={require('../Assets/images/Spinner.gif')}
            style={{width: '100%', height: '100%'}}
          /> */}
        </View>
      </View>
    </Modal>
  );
};
const Loader = ({isLoading}) => {
  const [loading] = useAxiosLoader();
  return <LoaderView loading={loading || isLoading ? isLoading : false} />;
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: width / 4,
    width: width / 4,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export {ax as ApiConnect, Loader};
