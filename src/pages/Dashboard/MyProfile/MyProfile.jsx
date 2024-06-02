import useAuth from "../../../hooks/useAuth";


const MyProfile = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user.photoURL} />
                </div>
            </div>
            <h2 className="font-bold text-2xl">Name: {user.displayName}</h2>
        </div>
    );
};

export default MyProfile;