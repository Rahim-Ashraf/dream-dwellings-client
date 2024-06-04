import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddProperty = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const handleAddProperty = async (e) => {
        e.preventDefault();
        const form = e.target;
        const property_title = form.property_title.value;
        const property_location = form.property_location.value;
        const agent_name = form.agent_name.value;
        const agent_email = form.agent_email.value;
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
            agent_name,
            agent_email,
            agent_image: user.photoURL,
            price_range,
            property_image,
            verification_status: "pending",
        }
        axiosSecure.post("/properties", data)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Property Uploaded",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form onSubmit={handleAddProperty} className="card-body" >
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
                    <input type="file" name="property_image" className="file-input file-input-bordered h-16" required />
                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Agent name</span>
                        </label>
                        <input name="agent_name" defaultValue={user.displayName} disabled className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Agent email</span>
                        </label>
                        <input name="agent_email" defaultValue={user.email} disabled className="input input-bordered" required />

                    </div>
                </div>

                <input className="btn bg-[#0055ff] text-white" type="submit" value="Add Property" />
            </form>
        </div>
    );
};

export default AddProperty;