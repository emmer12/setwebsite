"use client";
import React, { FormEventHandler, useState } from "react";
import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charsetUTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/users/create",
        {
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
        },
        axiosConfig
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-80 m-auto my-4 py-12">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2 className="font-bold text-2xl">Sign up</h2>
        </div>
        <div className="field">
          <input
            type="type"
            onChange={handleChange}
            name="name"
            placeholder="Fullname"
            value={userInput.name}
          />
        </div>
        <div className="field">
          <input
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="example@mail.com"
            value={userInput.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={userInput.password}
            placeholder="********"
          />
        </div>

        <button className="em__button primary mt-4 w-full">
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="19"
            height="5"
            viewBox="0 0 19 5"
          >
            <image
              id="right-arrow_35_copy_2"
              data-name="right-arrow (35) copy 2"
              width="19"
              height="5"
              xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAVElEQVQYla3QsQ1AUBhF4U+oTaFSSERjBBYxicQCljCJCaxhAQX5V3jPTW5zi5OTKzMbLhSBqVCiTmQ2aHFijmHH+0OP0BvQJZotGPFgyv1sxY0ePoJ2GONIaxKpAAAAAElFTkSuQmCC"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SignIn;
