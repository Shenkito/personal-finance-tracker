import { useAuthContext } from "../../../context/AuthContext";

const ProfilePicture = () => {
    const { authUser } = useAuthContext();

    // Check if the user has a profile picture, otherwise, use a default one
    const profilePicUrl = authUser?.profilePicture
        ? `http://localhost:5000/uploads/${authUser.profilePicture}`
        : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

    return (
        <div className="flex items-center">
            <img
                src={profilePicUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
            />
            <span className="ml-4">{authUser?.username}</span>
        </div>
    );
};

export default ProfilePicture;
