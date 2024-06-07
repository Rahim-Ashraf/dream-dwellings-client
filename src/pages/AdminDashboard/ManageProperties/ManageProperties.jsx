import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: properties = [], refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosSecure.get("/properties");
            return res.data;
        }
    })

    const handleAccept = (property) => {
        axiosSecure.patch(`/property-details?id=${property._id}`, { verification_status: "verified" })
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }
    const handleReject = (property) => {
        axiosSecure.patch(`/property-details?id=${property._id}`, { verification_status: "rejected" })
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Agent name</th>
                        <th>Agent email</th>
                        <th>Price range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        properties.map((property, idx) => <tr key={property._id}>
                            <th>{idx + 1}</th>
                            <td>{property.property_title}</td>
                            <td>{property.property_location}</td>
                            <td>{property.agent_name}</td>
                            <td>{property.agent_email}</td>
                            <td>${property.price_range}</td>
                            <td>
                                {property.verification_status === "pending" ? <>
                                    <button onClick={() => handleAccept(property)} className="btn btn-sm bg-[#0055ff] text-white">Accept</button>
                                    <button onClick={() => handleReject(property)} className="btn btn-errorf btn-sm btn-error">Reject</button>
                                </> : <h2 className={property.verification_status === "verified" ? "text-emerald-600 font-bold" : property.verification_status === "rejected" ? "text-red-600 font-bold" : ""}>{property.verification_status}</h2>}
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;