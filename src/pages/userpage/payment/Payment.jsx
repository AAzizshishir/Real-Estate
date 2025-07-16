import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51Rgg6tPQPDj20kj67tChsvqDrCxh3RzDpmNQe6595ket3nGygPOtDEvILqrc2mrwJCuwEE3HeeBJ0Kro41zYINuD008JaQ1K2I"
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default Payment;
