import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const RequestedProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: requestedProperties = [], refetch } = useQuery({
        queryKey: ["requestedProperties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-properties?email=${user.email}`);
            return res.data;
        }
    })
    const handleAccept = (property) => {

        axiosSecure.patch(`/reject-property?id=${property.property_id}`, { verification_status: "rejected" })
            .then(res => {
                console.log("reject", res.data)
                axiosSecure.patch(`/accept-property?id=${property._id}`, { verification_status: "accepted" })
                    .then(res => {
                        console.log(res.data)
                        refetch();
                    })
            });
    }
    const handleReject = (id) => {
        axiosSecure.patch(`/accept-property?id=${id}`, { verification_status: "rejected" })
            .then(res => console.log(res.data))
        refetch()
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Buyer email</th>
                        <th>Buyer name</th>
                        <th>Offered price</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestedProperties.map((property, idx) => <tr key={property._id}>
                            <th>{idx + 1}</th>
                            <td>{property.property_title}</td>
                            <td>{property.property_location}</td>
                            <td>{property.buyer_email}</td>
                            <td>{property.buyer_name}</td>
                            <td>{property.offered_amount}</td>
                            <td>{property.verification_status === "accepted" ? <h2 className="text-emerald-600 font-bold">{property.verification_status}</h2> : property.verification_status === "pending" ? <button onClick={() => handleAccept(property)} className="btn btn-sm bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Accept</button> : property.verification_status === "bought" ? <h2 className="text-emerald-600 font-bold">Sold</h2> : ""}</td>

                            <td>{property.verification_status === "rejected" ? <h2 className="text-red-600 font-bold">{property.verification_status}</h2> : property.verification_status === "pending" ? <button onClick={() => handleReject(property._id)} className="btn btn-errorf btn-sm">Reject</button> : ""}</td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default RequestedProperties;