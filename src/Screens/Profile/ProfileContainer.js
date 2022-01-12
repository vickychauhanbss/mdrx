import {connect} from 'react-redux';

import AddProfile from './AddProfile';
// import {getFamily} from '../../../../Services/Profile/action';
import {
  getProfile,
  getProfileMsgRead,
  editProfile,
  editProfileMsgRead,
  GetProfileList
} from '../../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  // reports.report.fileUploadFailMsg
  // console.warn('checking the res', reports.report.profileSuccess);
  console.log(' profileData', reports.report.profileData);
  return {
    profileSuccess: reports.report.profileSuccess,
    profileFailed: reports.report.profileFailed,
    profileData: reports.report.profileData,
    editSuccess: reports.report.editProfileSuccess,
    editFail: reports.report.editProfileFail,
    profileList:  reports.report.profileList
  };
};

const mapDispatchToProps = {
  getProfileMsgRead,
  getProfile,
  editProfileMsgRead,
  editProfile,
  GetProfileList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProfile);
