import { deleteSpaces } from '../../utils';

import { AuthProps } from '../../components/Auth/types';

type LoginDataSendingType = {
  username: string;
  password: string;
};

type LoginDataServerType = {
  first_name: string;
  last_name: string;
};

type LoginDataType = {
  firstName: string;
  secondName: string;
};

export const COMPARE_NAMES_RESP_LOGIN = {
  username: 'login',
  password: 'password'
};

export const outgoingLoginData = (data: AuthProps): LoginDataSendingType => ({
  username: deleteSpaces(data.login),
  password: deleteSpaces(data.password)
});

export const incomingLoginData = (
  data: LoginDataServerType
): LoginDataType => ({
  firstName: data.first_name || '',
  secondName: data.last_name || ''
});
