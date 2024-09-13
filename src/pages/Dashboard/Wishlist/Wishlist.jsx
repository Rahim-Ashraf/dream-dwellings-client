import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Wishlist = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: wishlists = [], refetch: wishlistRefetch } = useQuery({
        queryKey: ["wishlists"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlists?email=${user.email}`)
            return res.data
        }
    })

    const handleRemoveWishlist = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Remove this Wishlist!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/remove-wishlist?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Wishlist has been removed.",
                                icon: "success"
                            });
                            wishlistRefetch()
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {wishlists.map(wishlist => <div key={wishlist._id} className="card card-compact bg-base-100 shadow-lg shadow-teal-200">
                <figure><img src={wishlist.property_image} alt="" /></figure>
                <div className="card-body w-full">
                    <h2 className="text-2xl font-bold mb-4">{wishlist.property_title}</h2>
                    <div className="flex justify-between items-center font-bold">
                        <div>
                            <p className="text-gray-600">Price Range</p>
                            <p>${wishlist.price_range}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Location</p>
                            <p>{wishlist.property_location}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Status</p>
                            <p className="text-emerald-600">{wishlist.verification_status}</p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Agent: {wishlist.agent_name}</p>
                        <div className="max-w-10"><img className="rounded-[50%]" src={wishlist.agent_image} alt="" /></div>
                    </div>
                    <div className="divider"></div>
                    <Link to={`/dashboard/make-offer/${wishlist.property_id}`}><button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full">Make an offer</button></Link>
                    <button onClick={() => handleRemoveWishlist(wishlist._id)} className="btn bg-red-600 text-white">Remove</button>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;