import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const signUp = async ({ fullName, username, email, password, confirmPassword }) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, email, password, confirmPassword })
            })

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            };

            localStorage.setItem("current-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            //Add react-hot-toast error handling
            console.log("Error:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signUp };
}

export default useSignUp;