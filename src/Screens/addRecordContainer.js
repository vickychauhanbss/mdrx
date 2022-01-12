import {connect} from 'react-redux';

import Add from './AddRecord';
// import {getFamily} from '../../../../Services/Profile/action';
import {uploadReport, reportMsgRead, EditReport, editFileMsgRead} from '../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  // reports.report.fileUploadFailMsg
  // console.warn('checking the res', reports.report.editUploadReport);
  return {
    fileUploadSuccess: reports.report.fileUploadSuccess,
    fileUploadFailMsg: reports.report.fileUploadFailMsg,
    editDetails: reports.report.editUploadReport,
    editSuccess: reports.report.editSuccess,
    editFail: reports.report.editFail,
  };
};

const mapDispatchToProps = {
  uploadReport: uploadReport,
  reportMsgRead: reportMsgRead,
  EditReport: EditReport,
  editFileMsgRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
