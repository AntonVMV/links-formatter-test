export interface IForm {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}
