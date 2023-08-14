"use client";
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckAnim, Close } from "../icons";
import Button from "../Button";

interface ModalI {
  open: boolean;
  close: () => void;
  size?: "large" | "medium" | "small";
  type?: "success" | "error";
  title: string;
  msg: string;
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
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {},
    scale: 0.7,
  },
};

const Alert = ({
  open,
  close,
  size = "large",
  type = "success",
  title,
  msg,
}: ModalI) => {
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
            className={`m__container ${size}`}
          >
            <div className="m__header" onClick={() => close()}>
              <Close />
            </div>
            <div className="alert__body text-center">
              {type == "success" && (
                <div className="m-auto my-6 alert__success h-[100px] w-[100px] ">
                  <CheckAnim />
                </div>
              )}
              <div className="mb-6">
                <h4 className="text-2xl font-bold">{title}</h4>
                <h4>{msg}</h4>
              </div>

              <Button text="Ok" onClick={() => close()} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Alert;
