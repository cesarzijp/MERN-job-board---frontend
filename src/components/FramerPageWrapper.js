import { motion, AnimatePresence } from "framer-motion";
import React from "react";

function FramerPageWrapper({ children }) {
  return (
    <motion.div
      className='w-full block'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.54, 0.475, 0.005, 0.995] }}
    >
      {children}
    </motion.div>
  );
}

export default FramerPageWrapper;
