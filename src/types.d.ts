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

export interface ISortMethod {
  short?: "asc_short" | "desc_short";
  target?: "asc_target" | "desc_target";
  counter?: "asc_counter" | "desc_counter";
}

export interface ILinksOptions {
  order?: ISortMethod;
  offset: number;
  limit: number;
}
