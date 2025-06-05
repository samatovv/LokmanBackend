export interface LoginReq {
    login: string;
    password: string;
}

export interface LoginRes {
    // userId: number;
    role: string;
    token: string;
}