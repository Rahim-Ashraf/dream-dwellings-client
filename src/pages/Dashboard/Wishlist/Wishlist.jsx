import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";


const Wishlist = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: wishlists } = useQuery({
        queryKey: ["wishlists"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlists?email=${user.email}`)
            return res.data
        }
    })
    console.log(wishlists)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlists.map(wishlist => <div key={wishlist._id} className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={wishlist.property_image} alt="" /></figure>
                <div className="flex justify-between gap-4 p-4">
                    <div>
                        <p>{wishlist.price_range}</p>
                        <p>{wishlist.property_location}</p>
                        <p>{wishlist.agent_name}</p>
                        <p>{wishlist.agent_image}</p>
                        <p>{wishlist.verification_status}</p>
                    </div>
                    <div className="my-auto">
                    <button className="btn">Make an offer</button>
                        <Link to={`/details/${wishlist.property_id}`}><button className="btn bg-[#0055ff] text-white">Details</button></Link>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;