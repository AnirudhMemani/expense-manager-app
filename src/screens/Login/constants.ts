export enum ENCRYPTED_STORAGE_KEYS {
  SIGNRESPONSE = '@userSigninRes',
}

export enum LOGIN_MSG {
  CANCELLED = 'Could not process request. Try again!',
  SUCCESSFULL = 'Login successful!',
  IN_PROGRESS = 'Already logged in!',
  ERR = 'There was an error processing request, try again later!',
  USER_LOGOUT = 'Are you sure you want to logout?',
  ANONY_LOGOUT = 'All data will be lost. Are you sure you want to logout?',
  GUEST_ACCOUNT = 'You are on Guest Account',
}
