/**
 * @description User-Service parameters
 */
export interface TalkUser {
  name: string;
  id: string;
}

export interface IUserOptions {
  username: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface MyResponse {
  code: number;
  msg: string;
  data: any;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  password: string;
  code: string;
}
