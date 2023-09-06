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
    <div className="em__hero__right">
      <Image
        height={613}
        width={600}
        alt="Hero Image"
        src="/assets/images/hero/hero-bg.png"
      />
    </div>
  );
};

export default HeroImageComponent;
