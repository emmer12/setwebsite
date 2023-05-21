import Image from "next/image";
import React from "react";

const DesignCard = () => {
  return (
    <div className="my-3 shadow design-card">
      <div className="flex gap-3">
        <div className="display flex-shrink-0">
          <Image
            height={200}
            width={140}
            src={"/assets/images/designs.jpg"}
            alt="Designs"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl">This is the title</h4>
          <div className="status">Completed</div>
        </div>
        <div className="self-center">
          <button className="em__button">View Files</button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
