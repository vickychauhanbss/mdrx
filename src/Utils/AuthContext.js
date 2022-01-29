import React, {useState, useEffect} from 'react';
import {getItem, setItem, removeItem} from './StorageService';
// import {Loader} from '../../../Services/utils/ApiConnect';

export const AuthContext = React.createContext();

const STORAGE_USER_KEY = 'user';

const STORAGE_TOKEN_KEY = 'token';

const STORAGE_COOKIES_KEY = 'cookies';


const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [cookies, setCookies] = useState();

  const [logout, setLogout] = useState(false);
  // const [userExist, setuserExist]= useState(false)

  useEffect(() => {
    if (logout) {
      (async () => {
        // setUser('');
        // setuserExist(false);
        setToken('');
        setCookies('');
        setLogout(false);
        removeItem(STORAGE_USER_KEY).then((result) => {
          console.log('user logout', result);
        });
        removeItem(STORAGE_TOKEN_KEY).then((result) => {
          console.log('user logout', result);
        });

        removeItem(STORAGE_COOKIES_KEY).then((result) => {
          console.log('user logout', result);
        });
      })();
    } else if (user && token && user !== '' && token !== '') {
      setItem('user', user);
      setItem('token', token);
      setItem('cookies', cookies);

    } else if (!user && !token) {
      (async () => {
        getItem(STORAGE_USER_KEY).then((userValue) => {
          if (userValue) {
            setUser(JSON.parse(userValue));
          } else {
            setUser('');
          }
        });
        getItem(STORAGE_TOKEN_KEY).then((tokenValue) => {
          if (tokenValue) {
            setToken(tokenValue);
          } else {
            setToken('');
            //setItem(STORAGE_TOKEN_KEY,'AAdssdsadadfdfsfsfdsfsfs')
          }
        });

        getItem(STORAGE_COOKIES_KEY).then((cookiesValue) => {
          console.log('cookiesValue+++++++++', cookiesValue)
          if (cookiesValue) {
            setCookies(cookiesValue);
          } else {
            setCookies('');
            //setItem(STORAGE_TOKEN_KEY,'AAdssdsadadfdfsfsfdsfsfs')
          }
        });
      })();
    }
  }, [logout, user, token, cookies]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        cookies,
        setUser,
        setToken,
        setLogout,
        setCookies
      }}>
      {user !== undefined && token !== undefined ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
