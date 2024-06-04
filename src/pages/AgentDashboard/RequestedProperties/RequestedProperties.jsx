import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const RequestedProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: requestedProperties = [] } = useQuery({
        queryKey: ["requestedProperties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-properties?email=${user.email}`);
            return res.data;
        }
    })
    console.log(requestedProperties)

    return (
        <div>

        </div>
    );
};

export default RequestedProperties;