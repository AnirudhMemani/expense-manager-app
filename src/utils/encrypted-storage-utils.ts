import EncryptedStorage from 'react-native-encrypted-storage';
import {ENCRYPTED_STORAGE_KEYS, LOGIN_MSG} from '../screens/Login/constants';
import {TSigninResProps} from '../screens/Login/types';
import {SimpleAlert} from './alert-utils';
import {COMMON_MSG} from './constants';
import {printLogs} from './log-utils';

export class EncryptedStorageUtils {
  static setSigninRes = async (value: TSigninResProps): Promise<boolean> => {
    const TAG = 'setSigninRes';
    try {
      if (value) {
        await EncryptedStorage.setItem(
          ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
          JSON.stringify(value),
        );
        printLogs(TAG, '| successful:', value.user);
        return true;
      }
      printLogs(TAG, '| unsuccessful because Response was empty:', value);
      return false;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      return false;
    }
  };

  static getSigninRes = async () => {
    const TAG = 'getSigninRes';
    try {
      const response = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
      );
      const signinResponse: TSigninResProps = response
        ? JSON.parse(response)
        : COMMON_MSG.EMPTY;
      printLogs(TAG, '| successful | Response:', signinResponse);
      return signinResponse;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      SimpleAlert('', LOGIN_MSG.ERR);
    }
  };

  static getAuthToken = async (): Promise<string> => {
    const TAG = 'getAuthToken';
    try {
      const signinRes = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
      );
      const token = signinRes
        ? JSON.parse(signinRes).idToken
        : COMMON_MSG.EMPTY;
      printLogs(TAG, '| successful | Token:', token);
      return token;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      throw new Error('Error fetching token from Encrypted Storage');
    }
  };

  static getUserEmailId = async (): Promise<string> => {
    const TAG = 'getUserEmailId';
    try {
      const signinRes = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
      );
      signinRes
        ? printLogs(TAG, '| successful:', JSON.parse(signinRes).user.email)
        : printLogs(TAG, '| unsuccessful because no Signin Response found');
      return signinRes ? JSON.parse(signinRes).user.email : COMMON_MSG.EMPTY;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      throw new Error('Failed to retrieve email from SigninResponse');
    }
  };

  static getUserFullName = async (): Promise<string> => {
    const TAG = 'getUserFullName';
    try {
      const signinRes = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
      );
      signinRes
        ? printLogs(TAG, '| successful:', JSON.parse(signinRes).user.name)
        : printLogs(TAG, '| unsuccessful because no Signin Response found');
      return signinRes ? JSON.parse(signinRes).user.name : COMMON_MSG.EMPTY;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      throw new Error('Failed to retrieve full name from SigninResponse');
    }
  };

  static getUserProfilePhoto = async (): Promise<string> => {
    const TAG = 'getUserProfilePhoto';
    try {
      const signinRes = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE,
      );
      signinRes
        ? printLogs(TAG, '| successful:', JSON.parse(signinRes).user.photo)
        : printLogs(TAG, '| unsuccessful because no Signin Response found');
      return signinRes ? JSON.parse(signinRes).user.photo : COMMON_MSG.EMPTY;
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      throw new Error('Failed to retrieve profile photo from Signin Response');
    }
  };

  static clearEncryptedStorage = async () => {
    const TAG = 'clearEncryptedStorage';
    try {
      await EncryptedStorage.removeItem(ENCRYPTED_STORAGE_KEYS.SIGNRESPONSE);
      printLogs(TAG, '| successful');
    } catch (error) {
      printLogs(TAG, '| unsuccessful | Error:', error);
      throw new Error('Failed to clear Encrypted Storage data');
    }
  };
}
