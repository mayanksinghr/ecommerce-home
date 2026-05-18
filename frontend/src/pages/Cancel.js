// src/pages/Cancel.jsx
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cancel=()=> {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
      >
        <XCircle className="text-red-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Payment Failed or Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. Please try again or contact support.
        </p>

        <Link
          to="/cart"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
        >
          Try Again
        </Link>
      </motion.div>
    </div>
  );
}

export default Cancel;
