import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const AdvertiseProperty = () => {
    const axiosPublic = useAxiosPublic();
    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosPublic.get("/verified-properties");
            return res.data;
        }
    });

    const handleAdvertise = (property) => {
        const property_id = property._id;
        const property_image = property.property_image;
        const property_location = property.property_location;
        const price_range = property.price_range;
        const verification_status = property.verification_status;
        const agent_email = property.agent_email;

        const body = {
            property_id,
            property_image,
            property_location,
            price_range,
            verification_status,
            agent_email
        };
        axiosPublic.post("/advertisements", body)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Advertisement Added",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price Range</th>
                        <th>Agent Name</th>
                        <th>Advertise</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        properties.map((property, idx) => <tr key={property._id}>
                            <th>{idx + 1}</th>
                            <td><div className="max-w-20"><img className="rounded-xl" src={property.property_image} alt="" /></div></td>
                            <td>{property.property_title}</td>
                            <td>{property.price_range}</td>
                            <td>{property.agent_name}</td>
                            <td><button onClick={() => handleAdvertise(property)} className="btn btn-sm bg-[#0055ff] text-white">Advertise</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AdvertiseProperty;