export interface User {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  token?:string;
}

export interface NewUser {
  email?: string;
  password?: string;
}

export interface userDto {
  name?:string;
  job?:string;
}
