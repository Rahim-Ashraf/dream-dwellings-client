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
    const navigate = useNavigate()

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
            const res = await axiosSecure.post("/payment", { amount: singlePropertyBought.offered_amount * 100 })
            const { clientSecret, paymentIntentId } = await res.data;
            const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            })
            if (confirmPayment.error) {
                setPaymentSuccess("")
                setPaymentError(confirmPayment.error.message)
            } else {
                console.log("client secret" + clientSecret, "payment intent id" + paymentIntentId)
                setPaymentError("");
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
            <button type="submit" disabled={!stripe || !elements} className='btn w-full mt-2 bg-[#0055ff] text-white'>
                Pay
            </button>
            {paymentError && <div>{paymentError}</div>}
            {paymentSuccess && <div>{paymentSuccess}</div>}
        </form>
    );
};

export default CheckoutForm;