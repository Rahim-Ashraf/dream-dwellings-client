import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure()

    const stripe = useStripe();
    const elements = useElements()
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("sdgsdfgsf")
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setPaymentError(error.message)
            setPaymentSuccess("")
        } else {
            const res = await axiosSecure.post("/payment", { amount: 1000 })
            const paymentIntent = await res.data;
            const confirmPayment = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
                payment_method: paymentMethod.id,
            })
            if (confirmPayment.error) {
                setPaymentSuccess("")
                setPaymentError(confirmPayment.error.message)
            } else {
                setPaymentError("")
                setPaymentSuccess("Payment Successful")
            }
        }

    }

    return (
        <form className='w-full lg:w-1/2 mx-auto' onSubmit={handleSubmit}>
            <CardElement />
            {/* <PaymentElement /> */}
            <button type="submit" disabled={!stripe || !elements} className='btn w-full mt-2 bg-[#0055ff] text-white'>
                Pay
            </button>
            {paymentError && <div>{paymentError}</div>}
            {paymentSuccess && <div>{paymentSuccess}</div>}
        </form>
    );
};

export default CheckoutForm;