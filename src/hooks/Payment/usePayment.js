import axiosInstance from "../../api/axiosInstance";

const usePayment = () => {
  const initiatePaymentProcess = async (planId) => {
    try {
      
      const { data } = await axiosInstance.post(
        "/subscription/create-payment-link",
        { planId }
      );

      if (data.success && data.paymentLinkUrl) {
        // Redirect to Razorpay payment page
        window.location.href = data.paymentLinkUrl;
      } else {
        alert("Something went wrong generating payment link");
      }
    } catch (error) {
      console.error("Payment link error", error);
      alert("Error creating payment link");
    }
  };

  return { initiatePaymentProcess };
};

export default usePayment;
