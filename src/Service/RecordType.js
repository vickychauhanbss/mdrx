import { APP_BASE_URL } from '../Utils/apiConfig';
import {ApiConnect} from '../Utils/Network';

const typeAction = () => {
  const config = {
    method: 'GET',
    url:
      APP_BASE_URL+'api/userrecord/listrecordtype/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Connection":"keep-alive"

    },
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {typeAction};

const changePin = form => {
  const config = {
    method: 'PUT',

    url:
      APP_BASE_URL+'api/user/change-password/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Connection":"keep-alive"

    },
    data: form,
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {changePin};
const EditRecordDelete = form => {
  const params = `${form}/`;
  const config = {
    method: 'DELETE',

    url:
  APP_BASE_URL+   'api/userrecord/recordfile/delete/' +
      params,

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Connection":"keep-alive"

    },
    // data: form,
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {EditRecordDelete};




const EditRecordRename = (id, paramsData) => {
  const params = `${id}/`;
  const config = {
    method: 'post',
    url: APP_BASE_URL+ 'api/userrecord/recordfile/rename/' + params,
    data: paramsData,

    headers: {
      Accept: 'application/json',
      "Connection":"keep-alive"

      // 'Content-Type': 'application/json',
    },
    // data: form,
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {EditRecordRename};



//recently Deleted
const RecentlyDeletedAction = form => {
  const config = {
    method: 'GET',

    url:
  APP_BASE_URL+    'api/userrecord/recently-deleted/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Connection":"keep-alive"

    },
    // data: form,
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {RecentlyDeletedAction};
const  ShareRecordAction= form => {
  const config = {
    method: 'POST',
    url: APP_BASE_URL + 'api/share-record/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Connection":"keep-alive"

    },
    data: form,
  };
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Record Type Action-----' + response);

        return response;
      } else {
        console.log(response);
        return response;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export {ShareRecordAction};
