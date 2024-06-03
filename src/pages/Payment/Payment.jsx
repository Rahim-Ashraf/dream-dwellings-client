import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const stripePromise = loadStripe('pk_test_51PNIg408T0MNCRXm2X9k6yBcI0is6WGFLojhFVZ9uXp5CJtpmjxbfHCw4H87P71rBCVaeBkh5MUU9aqYnbVNMNhX00QDUPsJ8W');

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { data: singlePropertyBought = [] } = useQuery({
        queryKey: [""],
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-property-bought?id=${id}`);
            return res.data
        }
    })

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm singlePropertyBought={singlePropertyBought} />
            </Elements>
        </div>
    );
};

export default Payment;