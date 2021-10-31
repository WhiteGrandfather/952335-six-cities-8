import axios from 'axios';

type Url = string;
type Timeout = number;

const DEFAULT_URL: Url = 'https://8.react.pages.academy/six-cities';
const OFFERS_URL: Url = '/hotels';
const TIMEOUT: Timeout = 5000;

export const createAPI = async (): Promise<any> => {
  let api;
  try {
    await axios
      .get(`${DEFAULT_URL}${OFFERS_URL}`, {timeout: TIMEOUT})
      .then((response)=> {
        api = response.data;
      });
  } catch (error) {
    throw new Error(`${error}`);
  }
  return await api;
};
