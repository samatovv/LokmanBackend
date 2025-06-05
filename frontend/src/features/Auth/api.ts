import { apiRoot } from "@/api";
import { LoginReq } from "./type";

export const api = {
    signIn: (data: LoginReq) => {
        return apiRoot.post("/auth/login", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    },
    logout: () => {
        return apiRoot.get("/auth/logout", {
            withCredentials: true
        })
    }
}