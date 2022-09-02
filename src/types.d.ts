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
