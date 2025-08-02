import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  info: {
    bg: "bg-blue-500",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
      </svg>
    ),
  },
  success: {
    bg: "bg-green-500",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  error: {
    bg: "bg-red-500",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-yellow-500",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
      </svg>
    ),
  },
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const { icon } = typeStyles[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-4 right-4 ${typeStyles[type].bg} text-white px-4 py-2 rounded shadow-lg z-50`}
      >
        <div className="flex items-center">
          {icon}
          <span>{message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}