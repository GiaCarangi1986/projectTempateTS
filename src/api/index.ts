import { AuthProps } from '../components/Auth/types';

export const sendLoginData = async (data: AuthProps) => {
  // const serData = outgoingLoginData(data);

  // const res = await fetch('/api/auth/login/', {
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // })

  // const resData = await res.json();
  // return incomingLoginData(resData);

  const answer = {
    first_name: 'Liza',
    last_name: 'Kurochkina'
  };
  return answer;
};

export const testSending = async (data: any) => {
  // const serData = outgoingLoginData(data);

  // const res = await fetch('/api/auth/login/', {
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // })

  // const resData = await res.json();
  // return incomingLoginData(resData);

  const answer = 'test';
  return answer;
};
