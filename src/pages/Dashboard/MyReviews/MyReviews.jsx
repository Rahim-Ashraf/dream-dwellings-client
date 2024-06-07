import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const MyReviews = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myReviews = [], refetch: myReviewRefetch } = useQuery({
        queryKey: ["myReviews"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
            return res.data;
        }
    })
    const handleReviewDelete = (id) => {
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
                axiosSecure.delete(`/my-reviews?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            myReviewRefetch()
                        }
                    })

            }
        });

    }

    return (
        <div className="space-y-4">
            {myReviews.map(review => <div key={review._id} className="card card-compact  bg-emerald-600 bg-opacity-10 shadow-xl mx-4">
                <div className="card-body">
                    <div>
                        <div className="flex gap-4 items-center">
                            <h2 className="card-title">{review.property_title}</h2>
                            <p className="font-semibold">{review.date}</p>
                        </div>
                        <p className="font-bold">Agent: {review.agent_name}</p>
                        <p>{review.review_description}</p>
                    </div>
                    <button onClick={() => handleReviewDelete(review._id)} className="btn bg-red-600 text-white max-w-20">Delete</button>
                </div>
            </div>)}
        </div>
    );
};

export default MyReviews;