export type AuthData = {
  login: string;
  password: string;
};

export type UserBackend = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
  email: string,
  token: string,
}
