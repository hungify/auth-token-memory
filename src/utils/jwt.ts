import { gql } from '@apollo/client';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import client from '~/services/apolloClient';

export const refreshTokenMutation = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      message
      status
      statusCode
    }
  }
`;

const JwtManager = () => {
  const logoutEventName = 'jwt-logout';
  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;
  let refreshTokenRequest: any = null;
  let userPayload = {
    email: '',
    id: '',
  };

  const getToken = () => inMemoryToken;

  const getUserPayload = () => userPayload;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    // Decode and set countdown to refresh
    const decoded = jwtDecode<JwtPayload & typeof userPayload>(accessToken);
    userPayload = decoded;
    const expiresIn = (decoded.exp as number) - (decoded.iat as number);
    setRefreshTokenTimeout(expiresIn);
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    window.localStorage.setItem(logoutEventName, Date.now().toString());
    refreshTokenRequest = null;
    return true;
  };

  // To logout all tabs
  window.addEventListener('storage', (event) => {
    if (event.key === logoutEventName) {
      inMemoryToken = null;
      refreshTokenRequest = null;
    }
  });

  const waitForTokenRefresh = async () => {
    refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : getRefreshToken();

    try {
      const { data } = await refreshTokenRequest;
      const { accessToken } = data.refreshToken;
      refreshTokenRequest = null;
      setToken(accessToken);
      return true;
    } catch (error) {
      deleteToken();
      return false;
    }
  };

  const getRefreshToken = async () => {
    return await client.mutate({ mutation: refreshTokenMutation });
  };

  // This countdown feature is used to renew the JWT before it's no longer valid
  // in a way that is transparent to the user.
  const setRefreshTokenTimeout = (delay: number) => {
    // 5s before token expires
    refreshTokenTimeoutId = window.setTimeout(waitForTokenRefresh, delay * 1000 - 5000);
  };

  return {
    getToken,
    setToken,
    getRefreshToken,
    deleteToken,
    getUserPayload,
    waitForTokenRefresh,
    logoutEventName,
  };
};

export default JwtManager();
