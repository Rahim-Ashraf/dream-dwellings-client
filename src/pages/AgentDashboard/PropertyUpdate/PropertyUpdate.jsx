import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


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
    const price_range_from = property.price_range?.split('-')[0];
    const price_range_to = property.price_range?.split('-')[1];
    // console.log(price_range_from)

    const handleUpdateProperty = async (e) => {
        e.preventDefault();
        const form = e.target;
        const property_title = form.property_title.value;
        const property_location = form.property_location.value;
        const price_range_from = form.price_range_from.value;
        const price_range_to = form.price_range_to.value;
        const price_range = `${price_range_from}-${price_range_to}`;
        const image = form.property_image.files[0];
        const formData = new FormData();
        formData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
        formData.append("image", image)
        const res = await axios.post("https://api.imgbb.com/1/upload", formData)
        const property_image = res.data.data.image.url;

        const data = {
            property_title,
            property_location,
            price_range,
            property_image,
        }
        axiosSecure.patch(`/properties?id=${property._id}`, data)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Property Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form onSubmit={handleUpdateProperty} className="card-body" >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property title</span>
                    </label>
                    <input name="property_title" defaultValue={property.property_title} className="input input-bordered" required />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property Location</span>
                    </label>
                    <input name="property_location" defaultValue={property.property_location} className="input input-bordered h-16" required />

                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price Range from</span>
                        </label>
                        <input type="number" name="price_range_from" defaultValue={price_range_from} className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">To</span>
                        </label>
                        <input type="number" name="price_range_to" defaultValue={price_range_to} className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Property image</span>
                    </label>
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

                <input className="btn bg-[#0055ff] text-white" type="submit" value="Update Property" />
            </form>
        </div>
    );
};

export default PropertyUpdate;