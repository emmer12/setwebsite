import React from "react";

const CartItem = () => {
  return (
    <div className="cart__item">
      <div className="em__flex">
        <div className="display">
          <img src="/assets/images/s3.png" alt="Cart" />
        </div>
        <div className="details">
          <div className="d1">
            <div>
              <div className="title">
                <h4>Lorem ipsum dolor, sit amet Amet, cupiditate.</h4>
              </div>
              <div className="price">
                <span className="old">AED 230</span>
                <span className="new">$565</span>
              </div>
            </div>
            <div>
              <button className="del">Delete</button>
              <button className="up">Update</button>
            </div>
          </div>
          <div className="d2">
            <div>
              <button className="button1">-</button>
              <input type="number" />
              <button className="button2">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
