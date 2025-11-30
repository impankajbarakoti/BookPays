// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// const APIURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
// export default function BookDetails() {
//   const [book, setBook] = useState(null);
//   const [email, setEmail] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${APIURL}/api/books/${id}`)
//       .then((res) => setBook(res.data))
//       .catch((err) => console.log(err));
//   }, [id]);

//   function openRazorpay() {
//     if (!email) {
//       alert("Please enter your email");
//       return;
//     }

//     axios
//       .post("http://localhost:5000/api/payments/create-order", {
//         amount: book.price,
//       })
//       .then(({ data }) => {
//         const options = {
//           key: process.env.REACT_APP_RAZORPAY_KEY_ID, // or your key
//           amount: data.amount,
//           currency: data.currency,
//           name: book.title,
//           description: "Book Purchase",
//           order_id: data.id,
//           handler: function (response) {
//             axios
//               .post("http://localhost:5000/api/payments/verify", {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 email,
//                 bookId: book._id,
//               })
//               .then(() => {
//                 navigate("/success");
//               })
//               .catch((err) => {
//                 alert("Payment verification failed");
//                 console.error(err);
//               });
//           },
//           prefill: {
//             email,
//           },
//           theme: {
//             color: "#000000",
//           },
//         };
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       })
//       .catch((err) => alert("Failed to create order"));
//   }

//   if (!book) return <h2 className="text-center py-20">Loading...</h2>;

//   return (
//     <div className="w-[90%] mx-auto py-10">
//       <h1 className="text-3xl font-bold text-center mb-10">{book.title}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         <div className="flex justify-center">
//           <img
//             src={book.coverUrl}
//             alt={book.title}
//             className="w-full h-96 object-cover rounded-md shadow-lg"
//           />
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-2">Description</h3>
//           <p className="text-gray-700 mb-6 leading-relaxed">
//             {book.description}
//           </p>

//           <h3 className="text-xl font-semibold mb-3">Price</h3>
//           {book.pricingType !== "free" ? (
//             <div className="mb-6">
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{book.discountedPrice ? book.discountedPrice : book.price}
//               </p>
//               {book.discountedPrice && (
//                 <p className="text-gray-500 line-through">₹{book.price}</p>
//               )}
//             </div>
//           ) : (
//             <p className="text-lg font-bold text-green-600 mb-6">Free</p>
//           )}

//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 mb-4 w-full rounded"
//           />

//           <button
//             onClick={openRazorpay}
//             className="block w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
//           >
//             {book.buttonText || "Buy Now"}
//           </button>

//           {book.files && book.files.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-3">Download Files</h3>
//               {book.files.map((file, i) => (
//                 <a
//                   key={i}
//                   href={file.url}
//                   target="_blank"
//                   className="block py-2 px-4 mb-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                   rel="noreferrer"
//                 >
//                   {file.name || "Download File"}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const APIURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const RAZORPAY_KEY = "rzp_test_RlrtoWiuoBfg3E";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Load book
  useEffect(() => {
    axios
      .get(`${APIURL}/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function openRazorpay() {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    const finalAmount = book.discountedPrice || book.price;
    
    

axios
  .post(`${APIURL}/api/payments/create-order`, {
    amount: finalAmount, // number
  })
  .then(({ data }) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: data.amount, // already in paise
      currency: data.currency,
      name: book.title,
      description: "Book Purchase",
      order_id: data.id,
      handler: function (response) {
        axios
          .post(`${APIURL}/api/payments/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email,
            bookId: book._id,
          })
          .then((res) => {
            console.log(res.data); // check success
            navigate("/success");
          })
          .catch((err) => {
            console.log(err.response?.data); // show backend error
            alert("Payment verification failed");
          });
      },
      prefill: { email },
      theme: { color: "#000000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  })
  .catch((err) => {
    console.log(err.response?.data); // show backend error
    alert("Failed to create order");
  });

  }

  if (!book) return <h2 className="text-center py-20">Loading...</h2>

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">{book.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT BOOK IMAGE */}
        <div className="flex justify-center">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-96 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

          <h3 className="text-xl font-semibold mb-3">Price</h3>

          {book.pricingType !== "free" ? (
            <div className="mb-6">
              <p className="text-2xl font-bold text-gray-900">
                ₹{book.discountedPrice ? book.discountedPrice : book.price}
              </p>
              {book.discountedPrice && (
                <p className="text-gray-500 line-through">₹{book.price}</p>
              )}
            </div>
          ) : (
            <p className="text-lg font-bold text-green-600 mb-6">Free</p>
          )}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />

          {/* BUY BUTTON */}
          <button
            onClick={openRazorpay}
            className="block w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            {book.buttonText || "Buy Now"}
          </button>

          {/* DOWNLOAD IF FREE */}
          {book.pricingType === "free" && book.files?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Download Files</h3>
              {book.files.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  className="block py-2 px-4 mb-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  rel="noreferrer"
                >
                  {file.name || "Download File"}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
