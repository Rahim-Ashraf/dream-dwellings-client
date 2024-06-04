import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";


const PropertyUpdate = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: property = {} } = useQuery({
        queryKey: ["property"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property-details?id=${id}`);
            return res.data;
        }
    })
    console.log(property)

    const handleUpdateProperty = (e) => {
        e.preventDefault();
    }

    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form onSubmit={handleUpdateProperty} className="card-body" >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property title</span>
                    </label>
                    <input name="property_title" placeholder="Property Title" className="input input-bordered" required />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property Location</span>
                    </label>
                    <input name="property_location" placeholder="Property Location" className="input input-bordered h-16" required />

                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price Range from</span>
                        </label>
                        <input type="number" name="price_range_from" placeholder="Min price" className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">To</span>
                        </label>
                        <input type="number" name="price_range_to" placeholder="Max Price" className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property image</span>
                    </label>
                    <img src={property.property_image} alt="" />
                    <input type="file" name="property_image" className="file-input file-input-bordered h-16" required />
                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Agent name</span>
                        </label>
                        <input name="agent_name" defaultValue={property.agent_name} disabled className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Agent email</span>
                        </label>
                        <input name="agent_email" defaultValue={property.agent_email} disabled className="input input-bordered" required />

                    </div>
                </div>

                <input className="btn bg-[#0055ff] text-white" type="submit" value="Add Property" />
            </form>
        </div>
    );
};

export default PropertyUpdate;