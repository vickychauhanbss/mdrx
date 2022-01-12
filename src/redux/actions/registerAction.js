import { APP_BASE_URL } from '../../Utils/apiConfig';
import {ApiConnect} from '../../Utils/Network';

const registerAction = (
 form
) => {
  const config = {
    method: 'POST',
    url:
      APP_BASE_URL
      +'api/auth/register/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
   
    data: form,
  };
  console.log(JSON.stringify(config));
  return ApiConnect(config)
    .then(response => {
      if (response) {
        console.log('Login Action-----' + response);

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

export {registerAction};
const OtpVerify = async form => {
  const config = {
    method: 'POST',
    url:
   APP_BASE_URL+   'api/auth/login/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    data: form,
  };
  console.log(JSON.stringify(config));
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('OtpVerify Action-----' + response);

      return response;
    } else {
      console.log('check login', response.data);
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {OtpVerify};

const loginAction = async form => {
  const config = {
    method: 'POST',
    url:
   APP_BASE_URL+   'api/auth/receive-otp/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    data: form,
  };
  console.log(JSON.stringify(config));
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('Login Action-----' + response);

      return response;
    } else {
      console.log('check login', response.data);
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {loginAction};
const ListUserAction = async () => {
  const config = {
    method: 'GET',
    url:
   APP_BASE_URL+  'api/user/listprofile/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  console.log(JSON.stringify(config));
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('List Action' + response);

      return response;
    } else {
      console.log('Check List Action', response.data);
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {ListUserAction};


const UsedData = async () => {
  const config = {
    method: 'GET',
    url: APP_BASE_URL+  'api/user/data-used/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  console.log(JSON.stringify(config));
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('UsedDataUsedData ++++' + response);

      return response;
    } else {
      console.log('Check List Action', response.data);
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {UsedData};







const EmailVerify = async form => {
  const config = {
    method: 'POST',
    url:
     APP_BASE_URL+ 'api/auth/receive-otp/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },

    data: form,
  };
  console.log('Email Verify', config);
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('EmailVerify Action-----' + response);

      return response;
    } else {
      console.log('check login', response.data);
      return response;
    }
  } catch (err) {
    console.log('chek', err);
    return err;
  }
};

export {EmailVerify};
const ResetPin = async form => {
  const config = {
    method: 'POST',
    url:
     APP_BASE_URL+ 'api/auth/password/reset/',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    data: form,
  };
  console.log(JSON.stringify(config));
  try {
    const response = await ApiConnect(config);
    if (response) {
      console.log('Forget pin Action-----' + response);

      return response;
    } else {
      console.log('Forget pin check login', response.data);
      return response;
    }
  } catch (err) {
    console.log('chek', err);
    return err;
  }
};

export {ResetPin};
