import { useAuthContext } from "../../context/AuthContext";

const ProfilePicture = () => {
    
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center">
            <img
                src={authUser?.profilePicture || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
            />
            <span className="ml-4">{authUser?.username}</span>
        </div>
    );
};

export default ProfilePicture;
