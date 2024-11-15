import { createContext } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";

const token = localStorage.getItem("CarStore-Auth_Token");


export const userContex = createContext({ isAuthenticated: false });

export default function Contex() {
    let response;
    try {
        response = axios.get(`${backendUrl}/users/user-profile`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
    }

    return response;
}