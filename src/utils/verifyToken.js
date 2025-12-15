import api from "../api/api";

export const verifyToken = async (token) => {
    try {
        const response = await api.post("/auth/verifyToken", {token:"Bearer " + token });
        return response.data.isValid;
    } catch (error) {
        console.error("Token verification failed:", error);
        return false;
    }
};