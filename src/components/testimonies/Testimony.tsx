import React from "react";

const Testimony = ({ testimony }: any) => {
  return (
    <div className="em__testimony_card">
      <div className="inner">
        <span className="date">{testimony.date}</span>
        <p>{testimony.text}</p>
        <div className="em__flex em__justify__between">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="99px"
              height="18px"
            >
              <path
                fillRule="evenodd"
                fill="rgb(248, 183, 154)"
                d="M94.565,11.589 L95.370,17.998 L89.499,15.256 L83.629,17.998 L84.433,11.589 L80.1,6.875 L86.368,5.656 L89.499,0.0 L92.630,5.656 L98.998,6.875 L94.565,11.589 ZM75.370,17.998 L69.499,15.256 L63.629,17.998 L64.433,11.589 L60.1,6.875 L66.368,5.656 L69.499,0.0 L72.630,5.656 L78.998,6.875 L74.565,11.589 L75.370,17.998 ZM55.370,17.998 L49.499,15.256 L43.629,17.998 L44.433,11.589 L40.1,6.875 L46.368,5.656 L49.499,0.0 L52.630,5.656 L58.998,6.875 L54.565,11.589 L55.370,17.998 ZM35.370,17.998 L29.499,15.256 L23.629,17.998 L24.433,11.589 L20.1,6.875 L26.368,5.656 L29.499,0.0 L32.630,5.656 L38.998,6.875 L34.565,11.589 L35.370,17.998 ZM15.370,17.998 L9.499,15.256 L3.629,17.998 L4.433,11.589 L0.1,6.875 L6.368,5.656 L9.499,0.0 L12.630,5.656 L18.998,6.875 L14.565,11.589 L15.370,17.998 Z"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="58px"
              height="45px"
            >
              <path
                fillRule="evenodd"
                fill="rgb(251, 223, 199)"
                d="M33.2,45.0 L33.2,19.799 L46.930,19.799 C46.930,19.799 49.786,16.199 48.356,11.879 C46.930,6.121 39.788,5.39 39.788,5.39 L41.929,0.0 C41.929,0.0 57.999,2.157 57.999,19.441 L57.999,45.0 L33.2,45.0 ZM0.862,19.799 L14.789,19.799 C14.789,19.799 17.647,16.199 16.217,11.879 C14.789,6.121 7.646,5.39 7.646,5.39 L9.789,0.0 C9.789,0.0 25.859,2.157 25.859,19.441 L25.859,45.0 L0.862,45.0 L0.862,19.799 Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <hr />

      <div className="inner2">
        <div className="em__user">
          <div className="em__avatar">
            <img src="https://api.multiavatar.com/stefan.svg" alt="" />
          </div>
          <div className="em__details">
            <h4>{testimony.name}</h4>
            <p>{testimony.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
