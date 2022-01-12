
  import {connect} from 'react-redux';
import viewRecords from './viewRecord'
// import {getFamily} from '../../../../Services/Profile/action';
import {UpdateReport, reportMsgRead, EditReport, reportUpdateMsgRead,editFileMsgRead} from '../../redux/Reports/actions';
// import reports from '../redux/Reports/reducers';

const mapStateToProps = reports => {
  console.log('reports.report++++++', reports.report)
  // reports.report.fileUploadFailMsg
  // console.warn('checking the res', reports.report.editUploadReport);
  return {
    fileUpdateSuccess: reports.report.updateRecordSuccess,
    fileUpdateFail: reports.report.updateRecordFail,
    editDetails: reports.report.editUploadReport,
    editSuccess: reports.report.editSuccess,
    editFail: reports.report.editFail,
  };
};

const mapDispatchToProps = {
  UpdateReport,
  reportMsgRead: reportMsgRead,
  EditReport: EditReport,
  reportUpdateMsgRead,
  editFileMsgRead
};

export default connect(mapStateToProps, mapDispatchToProps)(viewRecords);
