export interface IForm {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}

export interface ILinkData {
  id: number;
  counter: number;
  short: string;
  target: string;
}

export interface IAuthErrorObj {
  loc: string[];
  mdg: string;
  type: string;
}

export interface IAuthError {
  detail: string | IAuthError;
}

export interface ISortMethod {}

export interface ILinksOptions {
  order?: string[];
  offset: number;
  limit: number;
}
