export const ClientErrors = {
  // from 1 - 20 general errors
  NOT_FOUND: {
    code: 1,
    message: 'Not found'
  },
  EL_NOT_FOUND: {
    code: 2,
    message: 'Element not found'
  },
  // from 21 - 50 auth errors
  UNAUTHORIZED: {
    code: 21,
    message: 'User is not authorized'
  },
  USER_EXSIST: {
    code: 22,
    message: 'User with this username already exist'
  }
};
