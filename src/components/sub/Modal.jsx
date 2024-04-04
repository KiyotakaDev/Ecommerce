"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const Modal = ({ isOpen, children, cancel }) => {
  const modalRef = useRef(null);

  // Cancel action if clicks outside the modal
  const handleClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      cancel();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
          >
            <motion.div
              ref={modalRef}
              className="z-20 bg-white p-4 rounded-md shadow-lg shadow-emerald-200 max-w-[50%]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
