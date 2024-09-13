import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ singlePropertyBought }) => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const [payLoading, setPayLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements()
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPayLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setPaymentError(error.message)
            setPaymentSuccess("")
            setPayLoading(false);
        } else {
            const res = await axiosSecure.post("/payment", { amount: singlePropertyBought.offered_amount * 100 })
            const { clientSecret, paymentIntentId } = await res.data;
            const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            })
            if (confirmPayment.error) {
                setPaymentSuccess("")
                setPaymentError(confirmPayment.error.message)
                setPayLoading(false);
            } else {
                console.log("client secret" + clientSecret, "payment intent id" + paymentIntentId)
                setPaymentError("");
                setPayLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                await axiosSecure.put(`/single-property-bought?id=${singlePropertyBought._id}`, { transaction_id: paymentIntentId, });
                navigate("/dashboard/property-bought")
            }
        }

    }

    return (
        <form className='w-full lg:w-1/2 mx-auto' onSubmit={handleSubmit}>
            <CardElement />
            {/* <PaymentElement /> */}
            <button type="submit" disabled={!stripe || !elements || payLoading} className='btn w-full mt-2 bg-gradient-to-br from-teal-500 to-[#0060f0] text-white'>
                Pay
            </button>
            {paymentError && <div>{paymentError}</div>}
            {paymentSuccess && <div>{paymentSuccess}</div>}
        </form>
    );
};

export default CheckoutForm;