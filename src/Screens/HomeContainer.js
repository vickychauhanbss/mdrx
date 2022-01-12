import {connect} from 'react-redux';

import Home from './Home';
// import {getFamily} from '../../../../Services/Profile/action';
import {
  uploadReport,
  reportMsgRead,
  getRecentReport,
  DeleteReport
} from '../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  // reports.report.fileUploadFailMsg
 
  return {
    fileUploadSuccess: reports.report.fileUploadSuccess,
    fileUploadFailMsg: reports.report.fileUploadFailMsg,
    recentReport: reports.report.getRecentReportData,
    DeleteSuccess: reports.report.deleteReportSuccess,
    DeleteFail: reports.report.deleteReportFail,
    
  };
};

const mapDispatchToProps = {
  uploadReport: uploadReport,
  reportMsgRead: reportMsgRead,
  getRecentReport :getRecentReport,
  DeleteReport
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
