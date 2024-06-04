import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyAddedProperties = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: myAddedProperties = [], refetch } = useQuery({
        queryKey: ["myAddedProperties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-properties?email=${user.email}`);
            return res.data;
        }
    })
    const handlepropertyDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/properties?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your property has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* advertisement cards */}
            {myAddedProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={property.property_image} alt="" /></figure>
                <div className="flex justify-between gap-4 p-4">
                    <div>
                        <h2 className="card-title">{property.property_title}</h2>
                        <p>{property.price_range}</p>
                        <p>Agent: {property.agent_name}</p>
                        <img src={property.agent_image} alt="" />
                        <p>{property.property_location}</p>
                        <p>Status: {property.verification_status}</p>
                    </div>
                    <div className="my-auto">
                        {property.verification_status !== "rejected" && <Link to={`/agent-dashboard/property-update/${property._id}`}><button className="btn bg-[#0055ff] text-white">Update</button></Link>}
                        <button onClick={() => handlepropertyDelete(property._id)} className="btn btn-error">Delete</button>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default MyAddedProperties;