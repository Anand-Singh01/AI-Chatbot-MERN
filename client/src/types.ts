export type LoginUserType = {
    email: string;
    password: string;
  };
  
  export type alertAtomType = {
    page: string,
    message: string,
    severity?: alertType
    timestamp?: number
  }
  
  export type SignupUserType = {
    email: string;
    password: string;
    name: string;
  };
  
  export type Message = {
    message: string;
    response: string;
    timestamp?: number;
  };
  
  export type updateProfileInfoType = {
    name: string | null | undefined;
    currentPassword: string;
    newPassword: string;
    email: string | null | undefined
    confirmNewPassword: string;
  };
  
  export type currentUserStateType = {
    name?: string | null;
    email?: string | null
  }
  
  export type currentMessageType = {
    message: string | null,
    timestamp?: number
  }
  
  export type errorMessageType = [
    {name?:string}?,
    {email?:string}?,
    {password?:string}?
  ]
  
  export type response = {
    message : string,
    status? : number,
    email? : string,
    name? : string
  }
  
  export enum alertType{
    'success',
    'info',
    'warning',
    'error',
  }