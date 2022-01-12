import axios from 'axios';
import React, {useContext} from 'react';
import {AuthContext} from '../Utils/AuthContext';

// import config from "../config/apiUrl";
import { APP_BASE_URL } from '../Utils/apiConfig';
// const {token, setToken, setLogout} = useContext(AuthContext);

console.log('AuthContext++++++', AuthContext);

// Create Instance
const AxiosInstance = axios.create({
    baseURL: APP_BASE_URL,
    timeout: 20000,
    transformRequest: [function (data, headers) {
    
        headers['Authorization'] = `Token ${AuthContext.token}`;
        if(data && data._parts){
            return data
        }else{
            return JSON.stringify(data)
        }
      }],
    headers:{'Content-Type': 'application/json',}
})

// Response Interceptor
AxiosInstance.interceptors.response.use((response) =>{
    return response;
}, (error) => {
    debugger
    const originalRequest = error.config;
    if (!error.response) {
        return Promise.reject({
            status: FAILURE, 
            message:'Please check your internet connection'})   
    }else {

        // const {dispatch} = configureStore; // direct access to redux store.
        if (error.response && error.response.status === 401) {
            return error.response
          } else {
            return error.response
          }
    }

})

export default AxiosInstance