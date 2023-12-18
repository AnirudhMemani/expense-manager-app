import {ITagProps} from '../components/types';
import {TSigninResProps} from '../screens/Login/types';

export interface IIncomeSliceProps {
  loader: boolean;
}

export interface ILoginSliceProps {
  userInfo: TSigninResProps;
}

export interface ITransactionProps {
  displayImageUri: string | undefined;
  tags: ITagProps[];
}
