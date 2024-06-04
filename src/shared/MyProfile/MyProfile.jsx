import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const MyProfile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: dbUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user.photoURL} />
                </div>
            </div>
            <h2 className="font-bold text-2xl">Name: {user.displayName}</h2>
            {dbUser?.role && <h2>{dbUser.role}</h2>}
        </div>
    );
};

export default MyProfile;