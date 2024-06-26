"use client";

import { motion } from "framer-motion";

const Animation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
