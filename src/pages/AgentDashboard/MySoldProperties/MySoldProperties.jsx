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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {
                    mySoldProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={property.property_image} alt="" /></figure>
                        <div className="p-4">
                            <h2 className="card-title">{property.property_title}</h2>
                            <p>Location: {property.property_location}</p>
                            <p>Buyer Name: {property.buyer_name}</p>
                            <p>Buyer Email: {property.buyer_email}</p>
                            <p>Sold Price: {property.offered_amount}</p>
                        </div>
                    </div>)
                }
            </div>
            <div className="flex gap-4 justify-center my-4">
                <h2 className="text-center font-bold text-2xl">Total property sold amount:</h2>
                <h2 className="text-center font-bold text-2xl text-[#0055ff]">${mySoldProperties.reduce((total, property) => {
                    return total + parseInt(property.offered_amount)
                }, 0)}</h2>
            </div>
        </div>
    );
};

export default MySoldProperties;