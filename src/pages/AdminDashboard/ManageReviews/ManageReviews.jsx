import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-reviews");
            return res.data;
        }
    })

    const handleDeleteReview = (id) => {
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
                axiosSecure.delete(`/delete-reviews?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Review deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })

            }
        });

    }

    return (
        <div>
            {reviews.map(review => <div key={review._id} className="card card-compact bg-base-100 shadow-xl mx-4">
                <div className="max-w-80 card-body">
                    <div className='flex gap-2'>
                        <div className="w-full"><img className='rounded-full' src={review.reviewer_image} alt={review.reviewer_name} /></div>
                        <div>
                            <h2 className="card-title">Reviewer name: {review.reviewer_name}</h2>
                            <h2 className="card-title">Reviewer email: {review.reviewer_email}</h2>
                            <p>{review.review_description}</p>
                        </div>
                    </div>
                    <button onClick={() => handleDeleteReview(review._id)} className="btn btn-error">Delete Review</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default ManageReviews;