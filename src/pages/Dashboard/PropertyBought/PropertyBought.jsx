import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const PropertyBought = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: propertyBoughts = [] } = useQuery({
        queryKey: ["propertyBought"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property-bought?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyBoughts.map(propertyBought => <div key={propertyBought._id} className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={propertyBought.property_image} alt="" /></figure>
                <div className="flex justify-between gap-4 p-4">
                    <div>
                        <h2 className="text-2xl font-bold">{propertyBought.property_title}</h2>
                        <p>{propertyBought.property_location}</p>
                        <p>Agent: {propertyBought.agent_name}</p>
                        <p>Amount: {propertyBought.offered_amount}</p>
                        <p>Status: {propertyBought.verification_status}</p>
                    </div>
                    <div className="my-auto">
                        {propertyBought.verification_status === "verified" ? <Link to={`/payment/${propertyBought._id}`}><button className="btn bg-[#0055ff] text-white">Pay</button></Link> : propertyBought.verification_status === "bought" ? <h2>transaction id: {propertyBought.transaction_id}</h2> : ""}
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default PropertyBought;