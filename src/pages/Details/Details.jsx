import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const Details = () => {
    const { user } = useAuth()
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { data: propertyDetails } = useQuery({
        queryKey: ["propertyDetails"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property-details?id=${id}`)
            return res.data

        }
    })
    const handleAddToWishlist = async (propertyDetails) => {
        const data = {
            property_id: propertyDetails._id,
            wishlist_email: user.email,
            property_image: propertyDetails.property_image,
            property_title: propertyDetails.property_title,
            property_location: propertyDetails.property_location,
            agent_name: propertyDetails.agent_name,
            agent_image: propertyDetails.agent_image,
            verification_status: propertyDetails.verification_status,
            price_range: propertyDetails.price_range,
        }
        const res = await axiosSecure.post("/add-to-wishlist", data)
        console.log(res.data)
    }
    const { data: reviews = [], refetch: reviewRefetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?propertyId=${id}`)
            return res.data

        }
    })
    console.log(reviews)
    const handleAddReview = async (e) => {
        // e.preventDefault()
        const review_description = e.target.review_description.value
        const data = {
            property_id: propertyDetails._id,
            property_title: propertyDetails.propertyDetails,
            review_description,
            reviewer_name: user.displayName,
            reviewer_email: user.email,
            reviewer_image: user.photoURL,
        }
        await axiosSecure.post("/reviews", data)
        reviewRefetch()
    }

    return (
        <div>
            <div className="card shadow-xl p-4">
                <div className="lg:flex">
                    <div className="w-full">
                        <img className="rounded-lg" src={propertyDetails?.property_image} alt="" />
                    </div>
                    <div className="card-body w-full">
                        <h2 className="text-4xl text-cyan-600 font-bold mb-4">{propertyDetails?.property_title}</h2>
                        <div className="flex gap-2 items-center font-bold">
                            <p>{propertyDetails?.property_description}</p>
                        </div>
                        <h2 className="text-xl font-bold">Category: <span className="text-emerald-600">{propertyDetails?.verification_status}</span></h2>
                    </div>
                    <button onClick={() => handleAddToWishlist(propertyDetails)} className="btn">Add to wishlist</button>
                </div>
                <div>
                    <h2 className="text-4xl text-center">reviews</h2>
                    <div>
                        {reviews.map(review => <div key={review._id}>
                            <div className="card card-compact bg-base-100 shadow-xl mx-4">
                                <div className="card-body">
                                    <div className='flex gap-2'>
                                        <div className=""><img className='rounded-full max-w-14' src={review.reviewer_image} alt={review.reviewer_name} /></div>
                                        <div>
                                            <h2 className="card-title">{review.reviewer_name}</h2>
                                            <p>{review.review_description}</p>
                                            <p>{review.property_title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add a review</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">

                            <div>
                                <form onSubmit={handleAddReview} method="dialog">
                                    <textarea name="review_description" className="textarea textarea-bordered" placeholder="Review"></textarea>
                                    <br />
                                    <input type="submit" value="Add Review" className="btn" />
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Details;