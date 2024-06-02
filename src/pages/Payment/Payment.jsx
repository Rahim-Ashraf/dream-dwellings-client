import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PNIg408T0MNCRXm2X9k6yBcI0is6WGFLojhFVZ9uXp5CJtpmjxbfHCw4H87P71rBCVaeBkh5MUU9aqYnbVNMNhX00QDUPsJ8W');

const Payment = () => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;