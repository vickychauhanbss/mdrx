import {connect} from 'react-redux';

import recordDetail from './recordDetail';
// import {getFamily} from '../../../../Services/Profile/action';
import {
  getAllReport,
  getReportMsgRead,
  DeleteReport,
  reportDeleteMsgRead,
} from '../../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  // reports.report.fileUploadFailMsg
  return {
    fileGetSuccess: reports.report.allReports,
    DeleteSuccess: reports.report.deleteReportSuccess,
    DeleteFail: reports.report.deleteReportFail,
    getReportSuccess: reports.report.getReport,
    getReportFail: reports.report.getReportFail,
    // Report: reports.report.allReports,
  };
};

const mapDispatchToProps = {
  getAllReport,
  DeleteReport,
  reportDeleteMsgRead,
  getReportMsgRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(recordDetail);
