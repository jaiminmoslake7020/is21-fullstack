import {coreFailedResponse, coreSuccessResponse} from '../utils/helpers/api';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {FailedResponseType, SuccessResponseType} from '../types/base';
import {PaintColour, User} from '../types/app';

export const responseJson = (r:any) => {
  console.log('r', r.status);
  if (r.status !== 200) {
    return undefined;
  }
  return r.json();
}

export const getUsers = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/users')
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

export const getPaintColors = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/paint-colours')
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

export const getPaintColorByName = (color:PaintColour) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`http://localhost:3000/api/paint-colours/${color}`)
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

export const createUser = (body:User) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/products', {
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

export const updateUser = (id:string, body:User) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`http://localhost:3000/api/users/${id}`, {
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

export const upsertPaintColours = (body:any) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/paint-colours', {
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
