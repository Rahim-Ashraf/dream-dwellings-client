import { useQuery } from '@tanstack/react-query';
import { register } from 'swiper/element/bundle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
// register Swiper custom elements
register();

const Reviews = () => {
    const axiosPublic = useAxiosPublic()
    const { data: latestReviews = [] } = useQuery({
        queryKey: ["latestReviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/latest-reviews")
            return res.data
        }
    })

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
                latestReviews.map(review => <div key={review._id} className="card shadow-xl border ">
                    <div className="p-4">
                        <div className='text-center'>
                            <div className='max-w-20 mx-auto'><img className='rounded-[50%]' src={review.reviewer_image} alt={review.reviewer_name} /></div>
                            <h2 className="font-bold text-xl">{review.reviewer_name}</h2>
                            <div>
                                <h2 className="font-semibold text-lg mb-4">{review.property_title}</h2>
                                <div className='flex gap-2'>
                                    <h2 className='font-semibold'>Review:</h2>
                                    <p className='text-left'>{review.review_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div >
    );
};

export default Reviews;