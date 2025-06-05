export interface UserProfileType {
    userId: number;
    role: string;
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    login: string;
  }
  
  export interface UserState {
    id?: number;
    login: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: string;
  }