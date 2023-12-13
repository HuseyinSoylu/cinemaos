// import React, { useState } from "react";
// import axios from "axios";
// import "./Payment.css";

// const Payment = ({ props }) => {
//   const { filmId, userId, seat, price, showtime } = props;

//   const filmIdint = parseInt(filmId);
//   const [formData, setFormData] = useState({
//     name: "",
//     cardNumber: "",
//     email: "",
//     expirationDate: "",
//     securityCode: "",
//     phone: "",
//     acceptTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.acceptTerms) {
//       alert("Please accept the terms before making the payment.");
//       return;
//     }

//     try {
//       const paymentData = {
//         filmId: filmIdint,
//         userId,
//         seat,
//         price,
//         paymentId: generatePaymentId(),
//         showtime,
//       };

//       const response = await axios.post(
//         "http://localhost:8000/api/tickets",
//         paymentData
//       );

//       console.log("Payment successful", response.data);
//     } catch (error) {
//       console.error("Payment failed", error);
//     }
//   };

//   const generatePaymentId = () => {
//     return Math.random().toString(36).substring(7);
//   };

//   return (
//     <div className="payment-container mt-3">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3 form-check">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="acceptTerms"
//             name="acceptTerms"
//             checked={formData.acceptTerms}
//             onChange={handleChange}
//           />
//           <label className="form-check-label" htmlFor="acceptTerms">
//             I agree to terms <br />
//           </label>
//         </div>
//         <button type="submit" className="btn btn-dark">
//           Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Payment;

import React, { useState } from "react";
import axios from "axios";
import "./Payment.css";

const Payment = ({ filmId, userId, seat, price, showtime }) => {
  console.log(filmId);
  console.log(userId);
  console.log(seat);
  console.log(price);
  console.log(showtime);
  // console.log(userId)

  const filmIdint = parseInt(filmId);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    email: "",
    expirationDate: "",
    securityCode: "",
    phone: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      alert("Please accept the terms before making the payment.");
      return;
    }

    try {
      const paymentData = {
        filmId: filmIdint,
        userId,
        seat,
        price,
        paymentId: generatePaymentId(),
        showtime,
      };

      const response = await axios.post(
        "http://localhost:8000/api/tickets",
        paymentData
      );

      console.log("Payment successful", response.data);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const generatePaymentId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="payment-container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="acceptTerms">
            I agree to terms <br />
          </label>
        </div>
        <button type="submit" className="btn btn-dark">
          Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
