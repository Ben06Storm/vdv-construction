export type AdminLoginData = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  message: string;
  token: string;
};