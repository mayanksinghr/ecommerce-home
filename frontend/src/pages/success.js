// src/pages/Success.jsx
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

 const Success =()=> {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
      >
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
         
        <Link to={"/all/order"} className="p-2  bg-green-600 text-white px-4 mx-4 mt-5 hover:bg-green-700 border-green-600 rounded front-semibold text-green-600 hover:text-white">See Order</Link>


        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}


export default Success


