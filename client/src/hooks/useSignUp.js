import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import toast from "react-hot-toast";

const useSignUp = () => {

    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const signUp = async ({ fullName, username, email, password, confirmPassword }, file) => {

        const success = handleInputErrors({ fullName, username, email, password, confirmPassword })

        if (!success) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
            if (file) {
                formData.append("profilePicture", file); // Append the file
            }

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData, // Send FormData
            });

            const data = await res.json();

            if (data.error) {

                throw new Error(data.error);

            }

            localStorage.setItem("current-user", JSON.stringify(data));

            setAuthUser(data);

        } catch (error) {

            toast.error(error.message);

        } finally {

            setLoading(false);
            
        }
    };


    return { loading, signUp };
}

export default useSignUp;

function handleInputErrors({ fullName, username, email, password, confirmPassword }) {

    if (!fullName || !username || !email || !password || !confirmPassword) {

        toast.error('Please fill in all fields');

        return false;

    };

    if (password !== confirmPassword) {

        toast.error('Passwords missmatch');

        return false;

    };

    if (password.length < 6) {

        toast.error('Password must be at least 6 characters');

        return false;

    };

    return true;
}