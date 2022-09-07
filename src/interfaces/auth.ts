import type { User } from '~/models/user';

export type RegisterInput = Pick<Required<User>, 'email' | 'password' | 'fullName'>;

export type LoginInput = Pick<Required<User>, 'email' | 'password'>;
