export interface IAuthAndLogin {
  data: {
    token: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
