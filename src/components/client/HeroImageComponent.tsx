"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const HeroImageComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: "auto" }}
      viewport={{ once: true }}
      className="em__hero__right"
      style={{ overflow: "hidden" }}
    >
      <Image
        height={400}
        width={600}
        alt="Hero Image"
        src="/assets/images/hero/hero-bg.png"
      />
    </motion.div>
  );
};

export default HeroImageComponent;
