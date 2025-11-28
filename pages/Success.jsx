import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-green-600">
        Payment Successful!
      </h1>
      <p className="mb-4">
        Thank you for your purchase. Please check your email for the download
        link.
      </p>
      <Link
        to="/"
        className="py-3 px-6 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
