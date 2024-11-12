import { useAuthContext } from "../../../context/AuthContext";

const ProfilePicture = ({ className }) => {
    const { authUser } = useAuthContext();

    const profilePicUrl = authUser?.profilePicture
        ? `http://localhost:5000/uploads/${authUser.profilePicture}`
        : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

    return (
        <div className="flex flex-col items-center">
            <img
                src={profilePicUrl}
                alt="Profile"
                className={`rounded-full ${className} object-cover w-full h-full`}
            />
        </div>
    );
};

export default ProfilePicture;
