import React, {useState, useEffect} from 'react';
import {getItem, setItem, removeItem} from './StorageService';
// import {Loader} from '../../../Services/utils/ApiConnect';

export const AuthContext = React.createContext();

const STORAGE_USER_KEY = 'user';

const STORAGE_TOKEN_KEY = 'token';

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [logout, setLogout] = useState(false);
  // const [userExist, setuserExist]= useState(false)

  useEffect(() => {
    if (logout) {
      (async () => {
        // setUser('');
        // setuserExist(false);
        setToken('');
        setLogout(false);
        removeItem(STORAGE_USER_KEY).then((result) => {
          console.log('user logout', result);
        });
        removeItem(STORAGE_TOKEN_KEY).then((result) => {
          console.log('user logout', result);
        });
      })();
    } else if (user && token && user !== '' && token !== '') {
      setItem('user', user);
      setItem('token', token);
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
      })();
    }
  }, [logout, user, token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        setLogout,
      }}>
      {user !== undefined && token !== undefined ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
