import {coreFailedResponse, coreSuccessResponse} from '../utils/helpers/api';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {FailedResponseType, SuccessResponseType} from '../types/base';
import {PaintColour, User} from '../types/app';

let apiUrl = 'http://192.168.1.100:3000';
if (window.location.hostname === 'localhost') {
  apiUrl = 'http://localhost:3000'
}
if (window.location.hostname === '') {
  apiUrl = 'http://localhost:3000'
}

export const responseJson = (r:any) => {
  console.log('r', r.status);
  if (r.status !== 200) {
    return undefined;
  }
  return r.json();
}

export const getUsers = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/users`)
      .then(r => responseJson(r))
      .then((response) => {
        if (response && Array.isArray(response)) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const getUser = (id:string) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/users/${id}`)
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const getPaintColours = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/paint-colours`)
      .then(r => responseJson(r))
      .then((response) => {
        if (response && Array.isArray(response)) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const getPaintColourByName = (color:PaintColour) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/paint-colours/${color}`)
      .then(r => responseJson(r))
      .then((response) => {
        if (response && response.productId) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const updateUser = (id:string, body:User) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const updatePaintColours = (body:any) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/paint-colours`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}

export const bulkUpdatePaintColours = (body:any) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/api/paint-colours`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((response:any) => {
        let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        e = { ...e, caughtError: response };
        resolve({ ...coreFailedResponse, error: e });
      });
  })
}
