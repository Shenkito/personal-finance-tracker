import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            };

            localStorage.setItem("current-user", JSON.stringify(data));

            setAuthUser(data);
        } catch (error) {
            //Add react-hot-toast error handling
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
};

export default useLogin;