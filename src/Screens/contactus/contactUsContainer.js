
  import {connect} from 'react-redux';

import ContactUs  from './contactus';
// import {getFamily} from '../../../../Services/Profile/action';
import {saveContactus, reportMsgRead, EditReport, reportUpdateMsgRead,editFileMsgRead, conactUsMsgRead} from '../../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  console.log('reports.report++++++', reports.report)
  // reports.report.fileUploadFailMsg
  // console.warn('checking the res', reports.report.editUploadReport);
  return {
    fileUpdateSuccess: reports.report.updateRecordSuccess,
    fileUpdateFail: reports.report.updateRecordFail,
    editDetails: reports.report.editUploadReport,
    conactUsMsgRead: reports.report.conactUsMsgRead,
    contactus: reports.report.contactus,
  };
};

const mapDispatchToProps = {
  saveContactus,
  reportMsgRead: reportMsgRead,
  EditReport: EditReport,
  reportUpdateMsgRead,
  editFileMsgRead,
  conactUsMsgRead
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
