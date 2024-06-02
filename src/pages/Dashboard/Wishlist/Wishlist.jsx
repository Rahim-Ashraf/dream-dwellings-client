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
                        <Link to={`/make-offer/${wishlist.property_id}`}><button className="btn bg-[#0055ff] text-white">Make an offer</button></Link>
                        <button onClick={() => handleRemoveWishlist(wishlist._id)} className="btn">Remove</button>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;