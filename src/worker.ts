/// <reference lib="webworker" />

import type { Token } from './interfaces/auth';
export declare const self: DedicatedWorkerGlobalScope;

const token: Token = {
  payload: {
    accessToken: null,
    refreshToken: null,
  },
};

self.addEventListener('message', ({ data }: MessageEvent<Token>) => {
  switch (data.type) {
    case 'setToken': {
      Object.assign(token, data);
      self.postMessage({
        type: 'getToken',
        payload: {
          accessToken: data.payload.accessToken,
          refreshToken: data.payload.refreshToken,
        },
      });
      break;
    }
    case 'getAccessToken': {
      const { accessToken } = token.payload;
      self.postMessage({
        type: 'getAccessToken',
        payload: {
          accessToken,
        },
      });
      break;
    }
    case 'getRefreshToken': {
      const { refreshToken } = token.payload;
      self.postMessage({
        type: 'getRefreshToken',
        payload: {
          refreshToken,
        },
      });
      break;
    }
    default:
      break;
  }
});
