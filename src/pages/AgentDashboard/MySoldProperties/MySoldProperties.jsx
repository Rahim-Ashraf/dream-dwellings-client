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
            {
                mySoldProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img src={property.property_image} alt="" /></figure>
                    <div className="flex justify-between gap-4 p-4">
                        <div>
                            <h2 className="card-title">{property.property_title}</h2>
                            <p>Location: {property.property_location}</p>
                            <p>Buyer Name: {property.buyer_name}</p>
                            <p>Buyer Email: {property.buyer_email}</p>
                            <p>Sold Price: {property.offered_amount}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MySoldProperties;