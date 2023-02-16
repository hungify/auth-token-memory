import type { User } from '~/models/user';

export type RegisterInput = Pick<Required<User>, 'email' | 'password' | 'fullName'>;

export type LoginInput = Pick<Required<User>, 'email' | 'password'>;

export interface Token {
  payload: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  type?: 'setToken' | 'getToken' | 'getAccessToken' | 'getRefreshToken';
}
