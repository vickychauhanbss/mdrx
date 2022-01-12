import {connect} from 'react-redux';

import openBillings from './billings';
// import {getFamily} from '../../../../Services/Profile/action';
import {
  uploadReport,
  reportMsgRead,
  getRecentReport,
  fetchBillings
} from '../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  // reports.report.fileUploadFailMsg
 
  return {
    fileUploadSuccess: reports.report.fileUploadSuccess,
    fileUploadFailMsg: reports.report.fileUploadFailMsg,
    recentReport: reports.report.getRecentReportData,
    billigLink: reports.report.billingLink,
    
  };
};

const mapDispatchToProps = {
  uploadReport: uploadReport,
  reportMsgRead: reportMsgRead,
  getRecentReport :getRecentReport ,
  fetchBillings: fetchBillings
};

export default connect(mapStateToProps, mapDispatchToProps)(openBillings);
