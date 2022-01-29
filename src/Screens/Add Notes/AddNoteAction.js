import { APP_BASE_URL } from '../../Utils/apiConfig';
import {ApiConnect} from '../../Utils/Network';
const AddNoteAction=( slug,form) => {

    // /api/userrecord/tivop-other-thiong-7/comment/
    const params = `api/userrecord/${slug}/comment/`
    const config = {
      method: 'POST',
  
      url:
       APP_BASE_URL+params,
  
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Connection":"keep-alive"

      },
      data:form,
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
  
  export {AddNoteAction};