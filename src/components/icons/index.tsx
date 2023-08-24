"use client";
export const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="59px"
    height="66px"
  >
    <image
      x="0px"
      y="0px"
      width="59px"
      height="66px"
      xlinkHref="data:img/png;base64,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"
    />
  </svg>
);

export const ArrowRight = () => (
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
);

export const Loading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30px"
    height="30px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="loading"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

export const Basket = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="22"
    viewBox="0 0 24 22"
  >
    <image
      id="shopping-cart-empty-side-view_1_copy_2"
      data-name="shopping-cart-empty-side-view (1) copy 2"
      width="24"
      height="22"
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAABtklEQVRIibXVO2tVQRDA8Z/xqvEJomlSqeAXEBEt1MJOCFqb2ipiLQqCIlhYGHxgJX4AwSLaKIKBEIgIGhRtggqKT7Tx+kLQhJWJHM+ee3JyQ/4w3Ls7s7M7szN74Bs+YAhrLQJn8QPTIRewdDE2GsCz2GRnpu2SVmHZTUziFXZgArtxOiL8gq8h7RjPSjtSXZZP5WO1IoIbMT5QSN185SeeLKkI/DN6sL4wl+yWYwVWYnVBVmFNFMi6kHTQM5nn4FacdKH8wXBPhZOJ+N2aaZpzPKK+UrViX0QwmGma8wa/RK7LPIrxrkzTjI3ox7U66xTBw2y2GUOxfnud9dO4pG54WSySqhQl7sYl9WaaetITswnXZ61aHczHcRQHcTs2m4t06sNhc3EO278l2m0H/y466hTBFI7gEh5jrCadRb7jTjbbgW0LuOh/1OX2BTbjZLwzabMtpajb0VStSM0G3MfVzFsFJ/C2lN/neB/yDh9L+vSCnspdVbMsHB2Lakqtv6dkORwR7Me9qL7G7I1T9cWK9P9yaXW61FQQifPzfYVTXkfxACN4HU1U5FB84VJjpXSd+0+LGX4Fg0q9zPoTAAAAAElFTkSuQmCC"
    />
  </svg>
);

export const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="100"
    height="100"
    x="0"
    y="0"
    className="m-auto"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <g>
      <g fillRule="evenodd" clip-rule="evenodd">
        <path
          fill="#4bae4f"
          d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z"
          data-original="#4bae4f"
        ></path>
        <path
          fill="#ffffff"
          d="M379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
          data-original="#ffffff"
        ></path>
      </g>
    </g>
  </svg>
);

export const UploadCloud = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={32}
    width={32}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    />
  </svg>
);

export const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#ff2514"
    viewBox="0 0 24 24"
    className="h-7 w-7"
    strokeWidth="1.5"
    stroke="#fff"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

export const Instagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const LinkedIn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Twitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export const DoubleCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="flex-shrink-0"
  >
    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
  </svg>
);

export const CaretRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="8"
    height="5"
    viewBox="0 0 8 5"
  >
    <image
      id="right-arrow_34_copy"
      data-name="right-arrow (34) copy"
      width="8"
      height="5"
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAZElEQVQImVXNwQmCAByF8V/ivS081ghSl6QtnMFLIwQ5kAQ5gN1qjVxAAuUfCvkd3/ceb5Pl5QdX1NZUuCTocMPxzx/mwTPFGQ0e2GJEi3u4KAQFXujnwhunEHGxsMOAL/a/EBP9gRHwPbUJlQAAAABJRU5ErkJggg=="
    />
  </svg>
);

export const Location = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-map-pin"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx={12} cy={10} r={3} />
  </svg>
);

export const TimesCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

export const AngleLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="10px"
    height="20px"
  >
    <path
      fillRule="evenodd"
      opacity="0.502"
      fill="rgb(31, 30, 28)"
      d="M0.353,10.730 L7.884,18.894 C8.363,19.413 9.139,19.413 9.618,18.894 C10.97,18.374 10.97,17.533 9.618,17.14 L2.955,9.790 L9.618,2.567 C10.97,2.48 10.97,1.206 9.618,0.686 C9.139,0.168 8.362,0.168 7.883,0.686 L0.353,8.850 C0.113,9.110 0.5,9.450 0.5,9.790 C0.5,10.130 0.114,10.471 0.353,10.730 Z"
    />
  </svg>
);

export const AngleRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="10px"
    height="20px"
  >
    <path
      fillRule="evenodd"
      opacity="0.502"
      fill="rgb(31, 30, 28)"
      d="M9.646,10.465 L2.115,18.634 C1.636,19.153 0.859,19.153 0.380,18.634 C0.98,18.114 0.98,17.271 0.380,16.752 L7.44,9.525 L0.381,2.297 C0.97,1.778 0.97,0.936 0.381,0.416 C0.859,0.102 1.636,0.102 2.115,0.416 L9.646,8.584 C9.885,8.845 10.5,9.184 10.5,9.525 C10.5,9.865 9.885,10.206 9.646,10.465 Z"
    />
  </svg>
);

export const Facebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// export const Twitter = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   >
//     <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//   </svg>
// );

export const Plus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

export const CheckAnim = () => (
  <svg width="115px" height="115px" viewBox="0 0 133 133" version="1.1">
    <g
      id="check-group"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5" />
      <circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5" />
      <circle
        id="outline"
        stroke="#07b481"
        strokeWidth="4"
        cx="66.5"
        cy="66.5"
        r="54.5"
      />
      <polyline
        id="check"
        stroke="#FFFFFF"
        strokeWidth="5.5"
        points="41 70 56 85 92 49"
      />
    </g>
  </svg>
);

export const Bell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
