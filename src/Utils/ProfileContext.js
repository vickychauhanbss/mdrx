import React, {useState, useEffect} from 'react';
import {getItem, setItem, removeItem} from './StorageService';
// import {Loader} from '../../../Services/utils/ApiConnect';

export const ProfileContext = React.createContext();

const STORAGE_USER_KEY = 'profile';

const ProfileContextProvider = ({children}) => {
  const [profile, setProfile] = useState();
  console.log('profile local++++++', profile)
  const [out, setOut] = useState(false);
  // const [userExist, setuserExist]= useState(false)

  useEffect(() => {
    if (out) {
      (async () => {
        // setUser('');
        // setuserExist(false);

        setOut(false);
        removeItem(STORAGE_USER_KEY).then(result => {
          console.log('user logout', result);
        });
      })();
    } else if (profile && profile !== '') {
      setItem('profile', profile);
    } else if (!profile) {
      (async () => {
        getItem(STORAGE_USER_KEY).then(profileValue => {
          if (profileValue) {
            setProfile(JSON.parse(profileValue));
          } else {
            setProfile('');
          }
        });
      })();
    }
  }, [out, profile]);
  return (
    <ProfileContext.Provider
      value={{
        profile,
        out,
        setProfile,
        setOut,
      }}>
      {profile !== undefined ? children : null}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
