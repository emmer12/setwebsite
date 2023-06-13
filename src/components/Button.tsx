"use client";
import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { Loading } from "./icons";
import cn from "classnames";

interface BtnI {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  CenterIcon?: ReactNode;
  onClick?: () => void;
  classNames?: string;
}

const Button: FC<BtnI> = ({
  to,
  text,
  classNames,
  RightIcon,
  LeftIcon,
  loading,
  disabled,
  onClick,
}) => {
  return (
    <>
      {to ? (
        <Link className={cn("em__button", classNames)} href={to}>
          {LeftIcon} {text}
          {loading ? <Loading /> : RightIcon}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={cn("em__button", classNames, {
            disabled: loading,
          })}
          disabled={loading || disabled}
        >
          {LeftIcon}

          {text}
          {loading ? <Loading /> : RightIcon}
        </button>
      )}
    </>
  );
};

export default Button;
