import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { verifyPayment } from "@/api/paymentApi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function PaymentReceipt() {
  const { orderId } = useParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await verifyPayment(orderId);
        setPayment(res.payment);
      } catch (err) {
        console.error("Error verifying payment:", err);
        toast.error("Failed to load payment status");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchPaymentStatus();
    }
  }, [orderId]);

  const handleDownloadInvoice = () => {
    if (!invoiceRef.current) return;

    const printContent = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: Arial, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
            background: #fff;
          }
          .invoice-card {
            width: 700px;
            margin: auto;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 12px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          .row { margin-bottom: 12px; }
          .label { color: #666; font-size: 14px; }
          .value { font-weight: bold; font-size: 16px; }
          .logo { max-height: 60px; }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          ${printContent}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = () => window.close();
          }
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-error">Payment details not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto p-6 sm:p-10 bg-base-100 shadow-xl rounded-2xl mt-10"
    >
      {/* Invoice Section */}
      <div ref={invoiceRef}>
        {/* ✅ Header with Logo (left) & Status (right) */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <img src="/logo.png" alt="Company Logo" className="h-16" />

          {/* Status with animation */}
          <div className="flex items-center gap-2">
            {payment.status === "Success" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}

            {payment.status === "Pending" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="text-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6 4a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            )}

            {payment.status === "Failed" && (
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
            )}

            {/* Status text */}
            <span
              className={`font-semibold text-lg ${
                payment.status === "Success"
                  ? "text-green-600"
                  : payment.status === "Pending"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {payment.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Receipt</h1>

        {/* Invoice Details */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-semibold">{payment.orderId}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-semibold text-primary">₹{payment.amount}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-semibold">
            {new Date(payment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        {payment.status === "Success" ? (
          <button onClick={handleDownloadInvoice} className="btn btn-success">
            Download Invoice
          </button>
        ) : (
          <button className="btn btn-outline">Try Again</button>
        )}
      </div>
    </motion.div>
  );
}
