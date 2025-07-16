import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const { offerId } = useParams();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Get offer data
  const { data: offer, isLoading } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${offerId}`);
      return res.data;
    },
    enabled: !!offerId,
  });

  const offerAmount = offer?.offerAmount;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const res = await axiosSecure.post("/create-payment-intent", {
      price: offerAmount,
      offerId: offer._id,
    });

    const clientSecret = res.data.clientSecret;

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save payment info to database
      console.log("Payment succeeded!");
      const paymentInfo = {
        transactionId: paymentIntent.id,
        status: "bought",
      };

      await axiosSecure.patch(`/offers/${offerId}`, paymentInfo);

      // Remove from Wishlist
      await axiosSecure.delete(`/wishlist/${offer.wishlistId}`);

      Swal.fire("Success!", "Payment successful.", "success");
    }

    setProcessing(false);
    navigate("/dashboard/bought-properties");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Pay for {offer.propertyTitle}</h2>
      <p className="mb-2">
        Offered Amount:{" "}
        <span className="font-semibold">${offer.offerAmount}</span>
      </p>
      <form onSubmit={onSubmit}>
        <div className="mb-4 border p-3 rounded">
          <CardElement />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
