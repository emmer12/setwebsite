"use client";
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../icons";

interface ModalI {
  open: boolean;
  close: () => void;
  children: ReactNode;
}

const overlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      //   delay: 1,
    },
  },
};

const container = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {},
    y: 100,
  },
};

const SafModal = ({ open, close, children }: ModalI) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={() => close()}
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="m__overlay"
          />
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="m__container"
          >
            <div className="m__header" onClick={() => close()}>
              <Close />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SafModal;
