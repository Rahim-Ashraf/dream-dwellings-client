import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MySoldProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: mySoldProperties = [] } = useQuery({
        queryKey: ["mySoldProperties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-sold-properties?email=${user.email}`);
            return res.data;
        }
    })
    console.log(mySoldProperties)

    return (
        <div>

        </div>
    );
};

export default MySoldProperties;