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
  AUTH_ERROR: {
    UNAUTHORIZED: {
      code: 21,
      message: 'User is not authorized'
    },
    USER_EMAIL_EXSIST: {
      code: 22,
      message: 'User with this email already exist'
    },
    USER_NOT_FOUND: {
      code: 23,
      message: 'User with with this email does not exist'
    },
    WRONG_PASS: {
      code: 24,
      message: 'Password is not correct'
    }
  }
};
