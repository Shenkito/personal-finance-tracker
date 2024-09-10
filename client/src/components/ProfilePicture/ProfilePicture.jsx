import { useAuthContext } from "../../context/AuthContext";

const ProfilePicture = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center">
            <img
                src={authUser?.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
            />
            <span className="ml-4">{authUser?.username}</span>
        </div>
    );
};

export default ProfilePicture;
