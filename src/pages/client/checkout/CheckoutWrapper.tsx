import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutWrapper = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_PUBLIC_KEY);
    return (
        <>
            <Elements stripe={stripePromise}>
                <Checkout />
            </Elements>
        </>
    );
};

export default CheckoutWrapper;
