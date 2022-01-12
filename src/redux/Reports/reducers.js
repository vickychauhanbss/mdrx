import {
  UPLOAD_REPORT_SUCCESS,
  UPLOAD_REPORT_FAIL,
  UPLOAD_REPORT_MSG_READ,
  GET_REPORT_SUCCESS,
  GET_REPORT,
  GET_RECENT_RECORDS,
  EDIT_REPORT_FAIL,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_MSG_READ,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  PROFILE_MSG_READ,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_MSG_READ,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_MSG_READ,
  UPDATE_REPORT_FAIL,
  DELETE_REPORT_MSG_READ,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  GET_REPORT_FAIL,
  GET_REPORT_MSG_READ,
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

const initialState = {
  fileUploadSuccess: null,
  fileUploadFailMsg: null,
  allReports: {},
  getRecentReportData: {},
  editUploadReport: {},
  editUploadReportFail: {},
  editSuccess: null,
  editFail: null,
  profileSuccess: null,
  profileFailed: null,
  profileData: {},
  editProfileSuccess: null,
  editProfileFail: null,
  updateRecordSuccess: null,
  updateRecordFail: null,
  deleteReportSuccess: null,
  deleteReportFail: null,
  getReport: null,
  getReportFail: null,
  paymentPlanSuccess:null,
  paymentPlanFail:null,
  pymentPlanDetail:'',
  billingLink:'',
  profileList: '',
  getProfileListFail: null,
  contactus: null,
  saveContactusFail:''

};
// case OPEN_SHARE_REPORT:
//   return { ...state, shareReportAppointment: payload, screen:screen };
const reports = (state = initialState, action) => {
  const {type, payload, screen} = action;
  switch (type) {
    // case GET_REPORT_SUCCESS:
    case UPLOAD_REPORT_SUCCESS:
      return {
        ...state,
        fileUploadSuccess: true,
        fileUploadFailMsg: false,
      };
    case UPLOAD_REPORT_FAIL:
      return {...state, fileUploadFailMsg: true, fileUploadSuccess: false};
    case UPLOAD_REPORT_MSG_READ:
      return {...state, fileUploadSuccess: false, fileUploadFailMsg: false};
    // case GET_REPORT:
    //   return {
    //     ...state,
    //     allReports: action.retrieveReportAll,
    //   };
    case GET_RECENT_RECORDS:
      return {
        ...state,
        getRecentReportData: action.retriveRecentRecords,
      };
    case EDIT_REPORT_SUCCESS:
      return {
        ...state,
        editUploadReport: payload,
        editSuccess: type !== GET_REPORT_SUCCESS ? true : false,
        editFail: false,
      };
    case EDIT_REPORT_FAIL:
      return {
        ...state,
        editUploadReportFail: payload,
        editFail: true,
        editSuccess: false,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileSuccess: true,
        profileData: payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profileFailed: true,
      };
    case PROFILE_MSG_READ: {
      return {
        ...state,
        profileFailed: false,
        profileSuccess: false,
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editProfileSuccess: true,
      };
    }
    case EDIT_REPORT_FAIL: {
      return {
        ...state,
        editProfileFail: true,
      };
    }
    case EDIT_PROFILE_MSG_READ: {
      return {
        ...state,
        editProfileFail: false,
        editProfileSuccess: false,
      };
    }
    case UPDATE_REPORT_SUCCESS: {
      return {
        ...state,
        updateRecordSuccess: true,
      };
    }
    case UPDATE_REPORT_FAIL: {
      return {
        ...state,
        updateRecordFail: true,
      };
    }
    case UPDATE_REPORT_MSG_READ: {
      return {
        ...state,
        updateRecordFail: false,
        updateRecordSuccess: false,
      };
    }
    case DELETE_REPORT_SUCCESS: {
      return {
        ...state,
        deleteReportSuccess: true,
      };
    }
    case DELETE_REPORT_FAIL: {
      return {
        ...state,
        deleteReportFail: true,
      };
    }
    case DELETE_REPORT_MSG_READ: {
      return {
        ...state,
        deleteReportFail: false,
        deleteReportSuccess: false,
      };
    }
    case GET_REPORT_SUCCESS: {
      return {
        ...state,
        getReport: true,
        allReports: payload,
      };
    }

    case BILLING_URL: {
      return {
        ...state,
        billingLink: payload,
      };
    }


    case GET_REPORT_FAIL: {
      return {
        ...state,
        getReportFail: true,
      };
    }
      case GET_REPORT_MSG_READ: {
        return {
          ...state,
          getReports: false,
          getReportFail: false,
        }
      }

        case PAYMENT_PLAN_SUCCESS: {
          return{
            ...state, 
            paymentPlanSuccess:true,
            pymentPlanDetail:payload
          }
        }
        case PAYMENT_PLAN_FAIL: {
          return{
            ...state, 
            paymentPlanFail:true,
            
          }
        }
          case PAYMENT_PLAN_RESET: {
            return{
              ...state, 
              paymentPlanSuccess:false,
              paymentPlanFail:false,
             
            }
          }



          case LIST_PROFILE:
            return {
              ...state,
            };


            case GET_LIST_PROFILE_SUCCESS: {
              return {
                ...state,
                profileList: payload,
              };
            }

            case GET_LIST_PROFILE_FAIL: {
              return {
                ...state,
                getProfileListFail: true,
              };
            }


            case CONTACT_US_SUCCESS: {
              return {
                ...state,
                contactus: true,
              };
            }

            case CONTACT_US_FAIL: {
              return {
                ...state,
                saveContactusFail: true,
              };
            }

            case CONTACT_US_CHECKED: {
              return {
                ...state,
                contactus: false,
              };
            }

            

       


    default:
      return state;
  }
};

export default reports;
