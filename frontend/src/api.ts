import axios from "axios";

export const apiRoot = axios.create({
    baseURL: "http://94.250.254.139:8080",
})

export const baseURL = "http://94.250.254.139:8080"