import Button from "@/components/Button";
import { Check } from "@/components/icons";
import React from "react";

const Completed = () => {
  return (
    <div>
      <div className="p-8 bg-white m-auto w-[640px] my-8 text-center">
        <Check />
        <h2 className="text-3xl text-green-800 m-5">Payment successful</h2>
        <p>Please check your email for the file you just purchased</p>
        <br />
        <Button text="Shop More" to="/backdrops" />
      </div>
    </div>
  );
};

export default Completed;

<div>
  <h2>Payment successful </h2>
</div>;
