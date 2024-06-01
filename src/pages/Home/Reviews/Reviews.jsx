import { useQuery } from '@tanstack/react-query';
import { register } from 'swiper/element/bundle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
// register Swiper custom elements
register();

const Reviews = () => {
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviews")
            return res.data
        }
    })

    return (
        <div>
            <swiper-container slides-per-view="3" loop="true" autoplay="true">
                {reviews.map(review => <swiper-slide key={review._id}>
                    <div className="card card-compact bg-base-100 shadow-xl mx-4">
                        <div className="card-body">
                            <div className='flex gap-2'>
                                <div><img className='rounded-full' src={review.reviewer_image} alt={review.reviewer_name} /></div>
                                <div>
                                    <h2 className="card-title">{review.reviewer_name}</h2>
                                    <p>{review.review_description}</p>
                                    <p>{review.property_title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>)}

            </swiper-container>
        </div>
    );
};

export default Reviews;