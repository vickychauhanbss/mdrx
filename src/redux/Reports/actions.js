import {NavigationActions} from 'react-navigation';
import { APP_BASE_URL } from '../../Utils/apiConfig';
import {ApiConnect} from '../../Utils/Network';

// import * as RootNavigation from '../../navigation/RootNavigationService';
import {
  GET_REPORT_FAIL,
  GET_REPORT_SUCCESS,
  GET_REPORT_MSG_READ,
  UPLOAD_REPORT_FAIL,
  UPLOAD_REPORT_MSG_READ,
  UPLOAD_REPORT_SUCCESS,
  GET_REPORT,
  GET_RECENT_RECORDS,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_FAIL,
  EDIT_REPORT_MSG_READ,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  PROFILE_MSG_READ,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_MSG_READ,
  UPDATE_REPORT_MSG_READ,
  UPDATE_REPORT_FAIL,
  UPDATE_REPORT_SUCCESS,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  DELETE_REPORT_MSG_READ,
  PAYMENT_PLAN_SUCCESS,
  PAYMENT_PLAN_FAIL,
  PAYMENT_PLAN_RESET,
  BILLING_URL,
  LIST_PROFILE,
  GET_LIST_PROFILE_FAIL,
  GET_LIST_PROFILE_SUCCESS,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAIL,
  CONTACT_US_CHECKED
} from './types';

// const getReportsSuccess = payload => {
//   return {type: GET_REPORT_SUCCESS, payload: payload};
// };

// const getReportsFail = error => {
//   return {type: GET_REPORT_FAIL, error};
// };

const reportUplodSuccess = payload => {
  return {type: UPLOAD_REPORT_SUCCESS, payload: payload};
};

const reportUplodFail = error => {
  return {type: UPLOAD_REPORT_FAIL, error};
};

export const reportMsgRead = () => {
  return {type: UPLOAD_REPORT_MSG_READ};
};
// export const reportShareMsgRead = () => {
//   return {type: SHARE_REPORT_MSG_READ};
// };
// const getUserFamilySuccess = payload => {
//   return {type: GET_USER_FAMILY_SUCCESS, payload};
// };

// const getUserFamilyFail = error => {
//   return {type: GET_USER_FAMILY_FAIL, error};
// };

export const uploadReport = data => dispatch => {
  // const params = `/${userPhn}`; // 9818125787


  // alert(JSON.stringify(data))

  // console.log('record data++++++++',data);
  const config = {
    method: 'POST',
    url:
      APP_BASE_URL+'api/userrecord/add/',
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      "Connection":"keep-alive"

      // , Accept: "application/json"
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {

      // alert(JSON.stringify(response))
      // console.log('record response+++++++++', response);
      if (response.status == 201) {
        console.log(response.data);
        if (response.data.date_record) {
        
          dispatch(reportUplodSuccess(response.data));
        } else {
          dispatch(reportUplodFail(response.data));
        }
        // }
      } else {
        dispatch(reportUplodFail(response.data));
      }
    })
    .catch(err => {
      // alert(JSON.stringify(err))

      dispatch(reportUplodFail(err));
    });
};



const getReportSuccess = payload => {
  return {type: GET_REPORT_SUCCESS, payload: payload};
};

const getReportFail = error => {
  return {type: GET_REPORT_FAIL, error};
};

export const getReportMsgRead = () => {
  return {type: GET_REPORT_MSG_READ};
};
export const getAllReport = () => dispatch => {
  const config = {
    method: 'GET',
    url:
     APP_BASE_URL+ 'api/userrecord/list/',
  };
  // const report = await ApiConnect(config);
  // dispatch({
  //   type: GET_REPORT,
  //   retrieveReportAll: report.data,
  // });
   ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log(response.data);
        if (response.data) {

          response.data.forEach(fruite => fruite['isChecked'] = false) 

          dispatch(getReportSuccess(response.data));
        } else {
          dispatch(getReportFail(response.data));
        }
        // }
      } else {
        dispatch(getReportFail(response.data));
      }
    })
    .catch(err => {
      dispatch(getReportFail(err));
    });
};

export const getRecentReport = () => async dispatch => {
  const config = {
    method: 'GET',
    url:
     APP_BASE_URL+ 'api/userrecord/list/latest',
  };
  const recentReport = await ApiConnect(config);
  dispatch({
    type: GET_RECENT_RECORDS,
    retriveRecentRecords: recentReport,
  });
};

const editFileSuccess = payload => {
  return {type: EDIT_REPORT_SUCCESS, payload: payload};
};

const editFileFail = error => {
  return {type: EDIT_REPORT_FAIL, error};
};

export const editFileMsgRead = () => {
  return {type: EDIT_REPORT_MSG_READ};
};

export const EditReport = (slug) => dispatch => {
  const params = `${slug}/view-details/`;
  const config = {
    method: 'GET',
    url: APP_BASE_URL + 'api/userrecord/' + params ,
    headers: {
      Accept: 'application/json',
      "Connection":"keep-alive"

      // Authorization: "Token fe210d031e380388a25bf012c071c4ff2092e67e"
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'multipart/form-data',
      // Accept: 'application/json',
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      console.log('response++++++++', response);

      if (response.status == 200) {
        if (response.data.record_name) {
          dispatch(editFileSuccess(response.data));
        } else {
          dispatch(editFileFail(response.data));
        }
        // }
      } else {
        dispatch(editFileFail(response.data));
      }
    })
    .catch(err => {
      console.log('err++++++++', err)
      dispatch(editFileFail(err));
    });
};
const getProfileSuccess = payload => {
  return {type: GET_PROFILE_SUCCESS, payload: payload};
};

const getProfileFail = error => {
  return {type: GET_PROFILE_FAIL, error};
};

export const getProfileMsgRead = () => {
  return {type: PROFILE_MSG_READ};
};

export const getProfile = user_id => dispatch => {
  const params = `${user_id}`; // 9818125787
  const config = {
    method: 'GET',
    url:
     APP_BASE_URL+ 'api/user/listprofile/',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // Accept: 'application/json',
    },
    // onUploadProgress: onUploadProgress,
  };
  console.log('configCheck', config);
  ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log('list profile++++++',response.data);
        if (response.data) {
          dispatch(getProfileSuccess(response.data));
        } else {
          dispatch(getProfileFail(response.data));
        }
        // }
      } else {
        dispatch(getProfileFail(response.data));
      }
    })
    .catch(err => {
      dispatch(getProfileFail(err));
    });
};
const editProfileSuccess = payload => {
  return {type: EDIT_PROFILE_SUCCESS, payload: payload};
};

const editProfileFail = error => {
  return {type: EDIT_PROFILE_FAIL, error};
};

export const editProfileMsgRead = () => {
  return {type: EDIT_PROFILE_MSG_READ};
};

export const editProfile = ( user_id, data) => dispatch => {
  console.log('data++++++++', data)
  console.log('user_id++++++++', user_id)

  const params = `${user_id}/update/`;
  const config = {
    method: 'PUT',
    url: APP_BASE_URL+ 'api/user/profile/' + params,
    data: data,
    headers: {
      Accept: 'application/json',
      "Connection":"keep-alive"

      // 'Content-Type': 'multipart/form-data',
      // Accept: 'application/json',
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      console.log('profile updated ++++++', response);
      if (response.status == 200) {
        console.log(response.data);
        if (response.data.record_name) {
          dispatch(editProfileSuccess(response.data));
        } else {
          dispatch(editProfileFail(response.data));
        }
        // }
      } else {
        dispatch(editProfileFail(response.data));
      }
    })
    .catch(err => {
      dispatch(editProfileFail(err));
    });
};
const reportUpdateSuccess = payload => {
  return {type: UPDATE_REPORT_SUCCESS, payload: payload};
};

const reportUpdateFail = error => {
  return {type: UPDATE_REPORT_FAIL, error};
};

export const reportUpdateMsgRead = () => {
  return {type: UPDATE_REPORT_MSG_READ};
};


export const UpdateReport = (slug, data) => dispatch => {
  const params = `${slug}/update/`; // 9818125787
  const config = {
    method: 'PUT',
    url:
   APP_BASE_URL+   'api/userrecord/' +
      params,
    data: data,
    headers: {
      // Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      "Connection":"keep-alive"


    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log(response.data);
        if (response.data.success) {
          dispatch(reportUpdateSuccess(response.data));
        } else {
          dispatch(reportUpdateFail(response.data));
        }
        // }
      } else {
        dispatch(reportUpdateFail(response.data));
      }
    })
    .catch(err => {
      dispatch(reportUpdateFail(err));
    });
};
const reportDeleteSuccess = payload => {
  return {type: DELETE_REPORT_SUCCESS, payload: payload};
};

const reportDeleteFail = error => {
  return {type: DELETE_REPORT_FAIL, error};
};

export const reportDeleteMsgRead = () => {
  return {type: DELETE_REPORT_MSG_READ};
};

export const DeleteReport = data => dispatch => {
  const config = {
    method: 'POST',
    url:
    APP_BASE_URL+  'api/userrecord/deletemany/',
    data: data,
    headers: {
      Accept: 'application/json',
      "Connection":"keep-alive"

      // 'Content-Type': 'multipart/fom-data',
      // , Accept: "application/json"
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log(response.data);
        if (response.data.success) {
          dispatch(reportDeleteSuccess(response.data));
        } else {
          dispatch(reportDeleteFail(response.data));
        }
        // }
      } else {
        dispatch(reportDeleteFail(response.data));
      }
    })
    .catch(err => {
      dispatch(reportDeleteFail(err));
    });
};
const GetPaymentPlanSuccess = payload => {
  return {type: PAYMENT_PLAN_SUCCESS, payload: payload};
};

const GetPaymentPlanFail = error => {
  return {type: PAYMENT_PLAN_FAIL, error};
};

export const GetPaymentPlanReset = () => {
  return {type: PAYMENT_PLAN_RESET};
};


export const GetPaymentPlan = (planType)  => dispatch => {
 
  const config = {
    method: 'POST',
    url:
   APP_BASE_URL+   'subscription/api/subscribe/' ,
     
    data: planType,
    headers: {
      // Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      "Connection":"keep-alive"


    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log('check',response);
        if (response.status == 200) {
          dispatch(GetPaymentPlanSuccess(response.data));
        } else {
          dispatch(GetPaymentPlanFail(response.data));
        }
        // }
      } else {
        dispatch(GetPaymentPlanFail(response.data));
      }
    })
    .catch(err => {
      dispatch(GetPaymentPlanFail(err));
    });

};


const GetBillingsLink = payload => {
  return {type: BILLING_URL, payload: payload};
}


export const fetchBillings = () => dispatch => {
  // const params = `/${userPhn}`; // 9818125787
  const config = {
    method: 'POST',
    url:
      APP_BASE_URL+'subscription/create-customer-portal-session-app/',
    // data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      "Connection":"keep-alive"

      // , Accept: "application/json"
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {

      console.log('response fetchBillings+++++++', response)
      if (response.status == 200) {
        
          dispatch(GetBillingsLink(response.data));
        
        // }
      } else {
        // dispatch(reportUplodFail(response.data));
      }
    })
    .catch(err => {
      console.log('err++++++', err)
      dispatch(reportUplodFail(err));
    });
};


// Profile list 

const GetProfileListSuccess = payload => {
  return {type: GET_LIST_PROFILE_SUCCESS, payload: payload};
};

const GetProifleListFail = error => {
  return {type: GET_LIST_PROFILE_FAIL, error};
};


export const GetProfileList = ()  => dispatch => {
 
  const config = {
    method: 'GET',
    url: APP_BASE_URL+  'api/user/listprofile' ,
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      if (response.status == 200) {
        console.log('check profile list ++++++ ',response);
        if (response.status == 200) {
          dispatch(GetProfileListSuccess(response.data));
        } else {
          dispatch(GetProifleListFail(response.data));
        }
        // }
      } else {
        dispatch(GetProifleListFail(response.data));
      }
    })
    .catch(err => {
      dispatch(GetPaymentPlanFail(err));
    });

};





const saveContactUsSuccess = payload => {
  return {type: CONTACT_US_SUCCESS, payload: payload};
};

const ContactUsFail = error => {
  return {type: CONTACT_US_FAIL, error};
};

export const conactUsMsgRead = () => {
  return {type: CONTACT_US_CHECKED};
};

//Contact us 
export const saveContactus = data => dispatch => {
  const config = {
    method: 'POST',
    url:
      APP_BASE_URL+'api/contact-us/',
    data: data,
    headers: {
      Accept: 'application/json',
      "Connection":"keep-alive"

      // 'Content-Type': 'multipart/form-data',
      // , Accept: "application/json"
    },
    // onUploadProgress: onUploadProgress,
  };
  ApiConnect(config)
    .then(response => {
      if (response.status == 201) {
        console.log('contact us +++++', response.data);
        if (response.data) {
        
          dispatch(saveContactUsSuccess(response.data));
        } else {
          dispatch(ContactUsFail(response.data));
        }
        // }
      } else {
        dispatch(ContactUsFail(response.data));
      }
    })
    .catch(err => {
      dispatch(ContactUsFail(err));
    });
};