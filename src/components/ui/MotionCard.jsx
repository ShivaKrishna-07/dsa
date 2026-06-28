"use client";

import { motion } from "framer-motion";

export default function MotionCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
